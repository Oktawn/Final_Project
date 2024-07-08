import { HeaderAccount } from "../components/AccountPage/HeaderAccount";
import { ResultTests } from "../components/AccountPage/ResultTests";
import { Stats } from "../components/AccountPage/Stats";

function Account() {
    return (
        <div>
            <HeaderAccount />
            <Stats />
            <ResultTests />
        </div>
    );
}

export default Account;