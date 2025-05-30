import { Form, Link, NavLink, Outlet } from "react-router";
import { getContacts } from "../data";
import type { Route } from "./+types/sidebar";

// MEMO: loaderはサーバーサイドでフェッチする、clientLoaderはクライアントサイドでフェッチする
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
  const { contacts } = loaderData;

  return (
    <>
      <div id="sidebar">
        <h1>
          <Link to="about">React Router Contacts</Link>
        </h1>
        <div>
          <Form id="search-form" role="search">
            <input
              aria-label="Search contacts"
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            <div aria-hidden hidden={true} id="search-spinner" />
          </Form>
          {/* MEMO: Action関数が実行される。されたあと、データを再取得する。 */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* MEMO:
                    NavLinkは、現在のルートと一致していれば、isActiveがtrueになる。
                    isPendingは、ローディング中の場合にtrueになる。
                  */}
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={`contacts/${contact.id}`}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite ? <span>★</span> : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
