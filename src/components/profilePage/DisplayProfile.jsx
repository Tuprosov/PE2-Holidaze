import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { useUserStore } from "../../js/store/userStore";

export function DisplayProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserStore();
  const {
    name,
    email,
    city,
    about,
    bio,
    banner,
    avatar,
    reviewsFromHosts = [],
  } = user;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Profile Card */}
      <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="h-60 bg-cover bg-center"
          style={{ backgroundImage: `url(${banner.url})` }}
        />
        <div className="p-6 pt-0 flex flex-col md:flex-row items-center gap-4 -mt-12">
          <img
            src={avatar.url}
            alt="Avatar"
            className="w-24 h-24 object-fill rounded-full border-4 border-white shadow-md"
          />
          <div className="text-center self-end md:text-left">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-600 text-sm sm:text-[1rem]">{email}</p>
            <p className="text-sm text-gray-500">{city}</p>
            <p className="text-sm text-gray-500"> {bio}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* About */}
      <section>
        <h3 className="text-lg font-semibold mb-2">About Me</h3>
        <p className="text-gray-700">{about || "No description yet."}</p>
      </section>

      {/* Reviews */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Reviews from Hosts</h3>
        {reviewsFromHosts.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviewsFromHosts.map((review, idx) => (
              <li key={idx} className="border p-4 rounded shadow-sm">
                <p className="text-gray-800">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  – {review.hostName}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
}
