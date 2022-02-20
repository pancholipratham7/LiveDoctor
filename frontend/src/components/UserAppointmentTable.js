import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./UserAppointmentTable.module.css";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import {
  fetchUsersAppointments,
  userAppointmentsActions,
} from "../store/userAppointmentSlice";
import Loader from "./../components/Loader";
import Error from "./../components/Error";
import { useParams } from "react-router-dom";
import Tick from "@material-ui/icons/CheckCircle";
import Cross from "@material-ui/icons/Cancel";
import axios from "axios";

// loading the checkout script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const UserAppointmentTable = (props) => {
  // hooks
  const dispatch = useDispatch();
  const params = useParams();

  const category =
    props.category === "Appointment Requests"
      ? "Pending"
      : props.category === "Booked Appointments"
      ? "Booked"
      : "";

  // get all appointments of the user
  useEffect(() => {
    dispatch(fetchUsersAppointments(params.id));
  }, [dispatch, params.id]);

  // appointments redux state
  const { myAppointments, loading, error } = useSelector(
    (state) => state.userAppointments
  );

  // userLoggedIn state redux state
  const { userLoggedInDetails } = useSelector((state) => state.user);

  // filtering appointments like rejected and booked appointments
  let filteredAppointments;
  if (category === "Pending") {
    filteredAppointments = myAppointments.filter(
      (appointment) => appointment.status === "Pending"
    );
  } else if (category === "Booked") {
    filteredAppointments = myAppointments.filter(
      (appointment) => appointment.status === "Booked"
    );
  }

  const dateOptions = { year: "numeric", month: "long", day: "numeric" };

  // this function will do a lot of things
  // first it will load the checkout script
  // then it will send a request to the backend for creating a razor pay order
  // and then it will also help to load  the checkout modal where you can select various options to do payment
  // then it will send a backend request to the razorpay server to authenticate the user from bank account
  // and then it deduct the money from the user's account and then transfer them to the razorPay account
  // then after that again a request will be sent from to our backend to verify the payment
  // and if the payment is verified(captured) then it will transfer money to the business account
  // but if the payment is not captured or verfied then money will be refunded to the user
  // If not able to understand then please read and understand from somewhere

  async function displayRazorpay(e) {
    // appointmentId
    const appointmentId = e.target.getAttribute("data-appointmentid");

    // current appointment complete details
    const currentAppointment = filteredAppointments.filter(
      (appointment) => appointment._id.toString() === appointmentId.toString()
    );

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post(
      "http://localhost:5000/api/payment/orders",
      {
        amount: currentAppointment[0].fees,
        currency: "INR",
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_8TrhETQcsXujXd", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: `${userLoggedInDetails.firstName} ${userLoggedInDetails.lastName}`,
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          appointmentId,
        };

        const result = await axios.post(
          "http://localhost:5000/api/payment/success",
          data
        );
        // after successfully paying we will be updating the redux state
        dispatch(
          userAppointmentsActions.updateAppointmentPaymentStatus(appointmentId)
        );
      },
      prefill: {
        name: `${userLoggedInDetails.firstName} ${userLoggedInDetails.lastName}`,
        email: `${userLoggedInDetails.email}`,
        contact: "9999999999",
      },
      notes: {
        address: " Corporate Office",
      },
      theme: {
        color: "#f54295",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className={classes.appointmentContainer}>
      {loading && <Loader />}
      {error && <Error errorMsg={error} />}
      {error === "" && !loading && filteredAppointments.length === 0 && (
        <span>No Appointments to show....!</span>
      )}
      {!loading && error === "" && filteredAppointments.length !== 0 && (
        <div className={classes["table-container"]}>
          <Table style={{ marginBottom: "0" }} responsive bordered hover>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Slot</th>
                {category === "Booked" && <th>Status</th>}
                {category === "Pending" && <th>Status</th>}
                {category === "Pending" && <th></th>}
                {category === "Booked" && <th>Fees Paid</th>}
                {category === "Booked" && <th>Pay Fees</th>}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td>
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </td>
                  <td>{`${appointment.startTime}PM - ${appointment.endTime}PM`}</td>
                  {category === "Booked" && (
                    <td>
                      <button className={classes["status-booked-tag"]} disabled>
                        Booked
                      </button>
                    </td>
                  )}
                  {category === "Pending" && (
                    <td>
                      <button
                        className={classes["status-pending-tag"]}
                        disabled
                      >
                        Pending
                      </button>
                    </td>
                  )}
                  {category === "Pending" && (
                    <td>Wait for some time. An email will be sent to you...</td>
                  )}
                  {category === "Booked" && (
                    <td>
                      {appointment.isPaid === true ? (
                        <Tick className={classes["tick-symbol"]} />
                      ) : (
                        <Cross className={classes["cross-symbol"]} />
                      )}
                    </td>
                  )}
                  {category === "Booked" && !appointment.isPaid && (
                    <td>
                      <button
                        data-appointmentid={appointment._id}
                        onClick={displayRazorpay}
                        className={classes["pay-fees-btn"]}
                      >
                        Pay Fees
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UserAppointmentTable;
