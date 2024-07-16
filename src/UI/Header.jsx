import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import Username from "../features/user/Username"

function Header() {
    return (
        <header className="flex items-center justify-between bg-yellow-500 px-4 py-3 border-b border-stone-250 sm:px-6 font-pizza">
            <Link to='/' className="uppercase tracking-widest">Fast React Pizza</Link>
            <SearchOrder/>
            <Username/>
        </header>
    )
}

export default Header