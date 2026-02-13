import { getInitials } from "../../services/teamApi";

const TeamMemberCard = ({ member }) => {
  const { name, role, bio, photo, email, phone } = member;

  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group">
      <div className="relative h-80 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {photo && !photo.includes("placeholder") ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary-500 to-navy-600 flex items-center justify-center text-white text-5xl font-bold shadow-glow">
              {getInitials(name)}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-heading font-bold text-navy-900 mb-1">
            {name}
          </h3>
          <p className="text-primary-600 font-medium text-lg">{role}</p>
        </div>

        {bio && (
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            {bio}
          </p>
        )}

        <div className="space-y-2">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">{email}</span>
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm">{phone}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
