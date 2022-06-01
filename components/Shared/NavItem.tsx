import Link from 'next/link'
export default function NavItem( {href, title}: any) {

    return (
        <li className="nav-item">
            <Link href={href}>
                <a className="nav-link" aria-current="page">{title}</a>
            </Link>
        </li> 
    )
}