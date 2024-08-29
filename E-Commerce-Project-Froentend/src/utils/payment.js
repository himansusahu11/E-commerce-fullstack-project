import axios from "axios";

const loadScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export const displayRazorpay = async (productId, price) => {
  await loadScript();
  console.log("Checkout.js script is ready");

  try {
    // Replacing fetch with axios for the initial booking request
    const resp = await axios.post(
      `http://localhost:5050/api/bookings/${productId}`,
      {
        priceAtThatTime: price,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add auth token if needed
        },
      }
    );

    const respData = resp.data;
    console.log(respData);

    if (respData.status !== "success" || !respData.data) {
      throw new Error("Failed to fetch booking details from server.");
    }

    const { id, currency, amountinPaise } = respData.data;

    const options = {
      key: "rzp_test_uRN5zQCSFsisja", // Your Razorpay public key
      amount: amountinPaise, // Amount in paise
      currency: currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: id, // Order ID from the backend
      handler: async function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);

        // Send payment details to backend for verification using axios
        await axios.post(
          "http://localhost:5050/api/bookings/verify",
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Add auth token if needed
            },
          }
        );
      },
      prefill: {
        name: "himansu sahu",
        email: "himansusahu459@gmail.com",
        contact: "9777611852",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpInstance = new window.Razorpay(options);
    rzpInstance.open();
  } catch (error) {
    console.error("Error during Razorpay checkout:", error);
  }
};
