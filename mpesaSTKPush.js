import getAccessToken from "./getAccessToken.js";
import base64 from "base-64";

async function MpseaSTKPush() {
  const currentDate = new Date();
  const accessToken = await getAccessToken();
  const Timestamp = `${currentDate.getFullYear()}${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}${String(currentDate.getDate()).padStart(2, "0")}${String(
    currentDate.getHours()
  ).padStart(2, "0")}${String(currentDate.getMinutes()).padStart(
    2,
    "0"
  )}${String(currentDate.getSeconds()).padStart(2, "0")}`;
  console.log(accessToken, Timestamp);
  fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      BusinessShortCode: 174379,
      Password: `${base64.encode(
        "174379" +
          "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
          Timestamp
      )}`,
      Timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: 254740429490,
      PartyB: 174379,
      PhoneNumber: 254740429490,
      CallBackURL:
        "https://8f61-197-136-183-22.ngrok-free.app/api/confirmation",
      AccountReference: "CompanyXLTD",
      TransactionDesc: "Payment of X",
    }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}
MpseaSTKPush();
export default MpseaSTKPush;
