import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const API = "http://localhost:5000/api/feedback";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [editId, setEditId] = useState(null); // EDIT STATE

  const getFeedbacks = async () => {
    try {
      const res = await axios.get(API);
      setFeedbacks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE + UPDATE LOGIC
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        toast.success("Feedback Updated");
        setEditId(null);
      } else {
        await axios.post(API, form);
        toast.success("Feedback Submitted");
      }

      setForm({
        name: "",
        email: "",
        message: "",
      });

      getFeedbacks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // DELETE
  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Deleted");
      getFeedbacks();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // EDIT
  const editFeedback = (item) => {
    setForm({
      name: item.name,
      email: item.email,
      message: item.message,
    });

    setEditId(item._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Toaster />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* FORM */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6">
            {editId ? "Edit Feedback" : "Feedback Form"}
          </h1>

          <form onSubmit={submitHandler} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <button className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700">
              {editId ? "Update Feedback" : "Submit Feedback"}
            </button>

          </form>
        </div>

        {/* LIST */}
        <div>
          <h2 className="text-3xl font-bold mb-5">
            All Feedback
          </h2>

          <div className="space-y-5">

            {feedbacks.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-5"
              >

                <h2 className="font-bold text-xl">
                  {item.name}
                </h2>

                <p className="text-blue-600">
                  {item.email}
                </p>

                <p className="mt-3">
                  {item.message}
                </p>

                <div className="flex gap-3 mt-5">

                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => editFeedback(item)}
                    className="bg-green-500 text-white px-5 py-2 rounded"
                  >
                    Edit
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteFeedback(item._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;