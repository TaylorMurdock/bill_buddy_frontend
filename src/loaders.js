// YOUR DEPLOYED API BASE URL
const url = "https://bill-buddy-backend.onrender.com/bills/";

// indexLoader
export const indexLoader = async () => {
  const response = await fetch(url);

  const bills = await response.json();
  console.log(bills);

  return bills;
};

// showLoader
export const showLoader = async ({ params }) => {
  const id = params.id;

  const response = await fetch(url + id);

  const bill = await response.json();

  return bill;
};
