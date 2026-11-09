import { BackLink } from '../../components/BackLink/BackLink';
import { getPageTitle } from '../../constants/app';
import './MessagePage.css';

export function MessagePage({ title, message }) {
  return (
    <main className="widget-box message-page">
      <title>{getPageTitle(title)}</title>
      <h2 className="message-page-title">{title}</h2>
      <p className="message-page-text">{message}</p>
      <BackLink />
    </main>
  );
}
