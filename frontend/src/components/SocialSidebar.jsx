import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';
import './SocialSidebar.css';

const defaultLinks = [
  { icon: FaWhatsapp, key: 'social_whatsapp', label: 'WhatsApp', buildHref: (v) => `https://wa.me/${v}?text=Info` },
  { icon: FaInstagram, key: 'social_instagram', label: 'Instagram', buildHref: (v) => v },
  { icon: FaYoutube, key: 'social_youtube', label: 'YouTube', buildHref: (v) => v },
  { icon: FaFacebookF, key: 'social_facebook', label: 'Facebook', buildHref: (v) => v },
];

function SocialSidebar() {
  const { settings } = useSettings();

  const links = defaultLinks
    .filter(item => settings[item.key])
    .map(item => ({
      ...item,
      href: item.buildHref(settings[item.key])
    }));

  if (links.length === 0) return null;

  return (
    <aside className="social-sidebar">
      {links.map((social, index) => {
        const Icon = social.icon;
        return (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-sidebar__link"
            aria-label={social.label}
            title={social.label}

          >
            <Icon />
          </a>
        );
      })}
    </aside>
  );
}

export default SocialSidebar;
