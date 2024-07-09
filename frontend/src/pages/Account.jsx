import { HeaderAccount } from "../components/AccountPage/HeaderAccount";
import { ResultTests } from "../components/AccountPage/ResultTests";
import { Stats } from "../components/AccountPage/Stats";
import "../components/AccountPage/Account.css"

function Account() {
    return (
        <div>
            <HeaderAccount />
            <Stats />
            {/* <ResultTests /> */}
        </div>
    );
}

export default Account;