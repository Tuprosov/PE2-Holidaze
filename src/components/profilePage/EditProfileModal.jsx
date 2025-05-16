import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserStore } from "../../js/store/userStore";

export default function EditProfileModal({ isOpen, onClose, user }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    city: user?.city || "",
    bio: user?.bio || "",
    about: user?.about || "",
    avatar: "",
    banner: "",
  });
  const { update, setMessage, message } = useUserStore();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => email.endsWith("@stud.noroff.no");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      return setMessage("Email must end with @stud.noroff.no");
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      city: formData.city,
      bio: formData.bio,
      avatar: {
        url: formData.avatar,
        alt: "Profile Picture",
      },
      banner: {
        url: formData.banner,
        alt: "Banner Picture",
      },
    };

    try {
      await update(user.name, payload);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.message || "Error updating profile");
    }
  };

  if (!isOpen || !user) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border [border-color:#d6e4e7] rounded"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full p-2 border [border-color:#d6e4e7] rounded"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full p-2 border [border-color:#d6e4e7] rounded"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio max. 50 characters"
            maxLength={50}
            className="w-full h-[42px] p-2 border [border-color:#d6e4e7] rounded resize-none"
          />
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="About Me"
            className="w-full p-2 border rounded [border-color:#d6e4e7] resize-none"
          />
          <input
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Profile Picture URL"
            className="w-full p-2 border [border-color:#d6e4e7] rounded"
          />
          <input
            name="banner"
            value={formData.banner}
            onChange={handleChange}
            placeholder="Banner URL"
            className="w-full p-2 border [border-color:#d6e4e7] rounded"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </form>
        {message && (
          <div
            className={`mt-4 ${
              message.toLowerCase().includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </motion.div>
    </div>
  );
}
