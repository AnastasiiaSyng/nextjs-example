import Hi from "../uploadLicense/index";
import Authorized from "../../components/authorized/index";

export default function redirectCheck() {
  return (
    <div>
      <p>Hi redirect page</p>
      <Authorized>
        {(props) => {
          const { isAdmin } = props;
          return (
            <div>
              <Hi />
            </div>
          );
        }}
      </Authorized>
    </div>
  );
}
