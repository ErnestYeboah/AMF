import { memo } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const NoItemPage = ({ message }: { message: string }) => {
  const [cookie] = useCookies(["token"]);

  return (
    <div className="text-center">
      <p className=" opacity-[.6] text-[2rem] mt-[var(--margin)] ">{message}</p>
      {!cookie["token"] && (
        <p>
          <Link className="text-[var(--accent-clr)]" to={"/signin"}>
            Sign In
          </Link>{" "}
          to view your items in cart
        </p>
      )}
    </div>
  );
};

export default memo(NoItemPage);
