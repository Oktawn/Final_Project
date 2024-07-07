import { memo } from "react"

const Footer = memo(function Footer() {
    return (
        <footer>
            <label ><a href="https://github.com/Oktawn/Final_Project" target="_blank">
                <i className='fa fa-code'></i> github</a>
            </label>
            <label ><a href="https://vk.com/oktawn" target="_blank">
                <i className='fa fa-vk'></i> contact</a>
            </label>
        </footer>
    )
})

export default Footer;
