import { NavLink, Outlet} from "react-router-dom";
import { getInvoices } from "../data";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
//import { Link } from "react-router-dom";
//import {
  //useParams,
  //useNavigate,
  //useLocation,
//} from "react-router-dom";
//import { getInvoice, deleteInvoice } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  //let navigate = useNavigate();
  //let location = useLocation();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
        .filter((invoice) => {
          let filter = searchParams.get("filter");
          if (!filter) return true;
          let name = invoice.name.toLowerCase();
          return name.startsWith(filter.toLowerCase());
        })
        .map((invoice) => (
          <NavLink
          style={({ isActive }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "red" : "",
            };
          }}
          to={`/invoices/${invoice.number}`}
          key={invoice.number}
        >
          {invoice.name}
        </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
  }
  export  function Invoice() {
    let params = useParams();
    return <h2>Invoice: {params.invoiceId}</h2>;
  }
