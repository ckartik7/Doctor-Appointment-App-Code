import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Booking = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {

    const res = await axios.post('/api/v1/doctor/get-doctor-by-id', { doctorId: window.location.pathname.slice(25) }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    });
    if (res.data.success) {
      setDoctor(res.data.data);
    }

  }

  const handleBooking = async () => {
    try {
      if (!date && !time) {
        return alert('Date and Time required.')
      }
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/book-appointment', {
        doctorId: window.location.pathname.slice(25), userId: user._id, doctorInfo: doctor, time: time, userInfo: user, date: date
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  }

  const handleAvailability = async () => {
    try {
      if (!date && !time) {
        return alert('Date and Time required.')
      }
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/check-availability', {
        doctorId: window.location.pathname.slice(25), time: time, date: date
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      }
      else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <Layout>
      <div className="container m-2">
        {doctor && (
          <div>
            <h4>
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees : {doctor.fees}</h4>
            <h4>
              Timings : {doctor.timing && doctor.timing[0].slice(11, 16)} -{" "}
              {doctor.timing && doctor.timing[1].slice(11, 16)}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
                }
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button className="btn btn-primary mt-2" onClick={handleAvailability}>
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Booking