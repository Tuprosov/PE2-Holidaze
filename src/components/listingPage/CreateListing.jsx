import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../../js/store/userStore";

const initialForm = {
  description: "",
  name: "",
  media: [],
  maxGuests: "",
  location: {
    country: "",
    city: "",
    address: "",
  },
  meta: {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  },
  price: "",
};

const steps = [
  "Describe your place",
  "Enter listing name",
  "Add image URLs",
  "Set max guests",
  "Enter location",
  "Select amenities",
  "Set price",
];

export default function CreateListing({
  onClose,
  venue = {},
  id = "",
  isCreating = true,
}) {
  const { createListing, setMessage } = useUserStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const { updateListing } = useUserStore();

  //if editing, merge venues to populate the form
  useEffect(() => {
    if (Object.keys(venue).length > 0) {
      setForm((prev) => ({
        ...prev,
        ...venue,
      }));
    }
  }, [venue]);

  const handleInput = (field, value, type) => {
    setForm((prev) => ({
      ...prev,
      [field]: type === "number" ? Number(value) : value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validation = validateStep();
    if (validation) {
      setErrors(validation);
    } else {
      setErrors("");
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors("");
    setStep((prev) => Math.max(0, prev - 1));
  };

  const validateStep = () => {
    setErrors("");
    let err = "";
    switch (step) {
      case 0:
        if (!form.description.trim()) err = "Required";
        break;
      case 1:
        if (!form.name.trim()) err = "Required";
        break;
      case 2:
        if (form.media.length === 0) err = "At least one image required";
        break;
      case 3:
        if (!form.maxGuests) err = "Required";
        break;
      case 4:
        if (!form.location.country) err = "Required";
        if (!form.location.city) err = "Required";
        break;
      case 6:
        if (!form.price) err = "Required";
        break;
      default:
        break;
    }
    return err;
  };

  const renderInput = (label, name, type = "text") => (
    <div className="w-full h-24 text-left">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={name.includes(".") ? getNestedValue(name) : form[name]}
        onChange={(e) =>
          name.includes(".")
            ? updateNestedValue(name, e.target.value)
            : handleInput(name, e.target.value, type)
        }
        className="w-full p-2 border [border-color:#d6e4e7] rounded"
      />
      {!label.includes("(optional)") && errors && (
        <p className="text-red-500 text-sm">{errors}</p>
      )}
    </div>
  );

  const getNestedValue = (path) => {
    return path.split(".").reduce((obj, key) => obj[key], form);
  };

  const updateNestedValue = (path, value) => {
    const keys = path.split(".");
    setForm((prev) => {
      const updated = { ...prev };
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addImageUrl = () => {
    if (imageUrl.trim()) {
      setForm((prev) => ({
        ...prev,
        media: [...prev.media, { url: imageUrl.trim(), alt: imageAlt.trim() }],
      }));
      setErrors("");
      setImageUrl("");
      setImageAlt("");
    }
  };

  const deleteImageUrl = (idx) => {
    setForm((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== idx),
    }));
  };

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [amenity]: !prev.meta[amenity],
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateStep();
    if (!validation) {
      try {
        isCreating ? await createListing(form) : await updateListing(id, form);
        window.location.reload();
      } catch (error) {
        setMessage(
          error.message ||
            `Error ${isCreating ? "creating" : "updating"} listing`
        );
      }
    } else {
      setErrors(validation);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-xl w-full mx-auto p-6 relative "
        >
          <button
            onClick={() => onClose(false)}
            type="button"
            className="absolute p-2 top-2 right-2 w-10 h-10"
          >
            ✕
          </button>

          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === step ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="h-80 flex flex-col justify-center"
            >
              {step === 0 && renderInput("Describe your place", "description")}
              {step === 1 && renderInput("Listing name", "name")}
              {step === 2 && (
                <div className="space-y-2 h-full text-left">
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium"
                  >
                    Image URL
                  </label>
                  <input
                    name="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 border [border-color:#d6e4e7] rounded"
                    placeholder="https://example.com/image.jpg"
                  />
                  <input
                    name="imageAlt"
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    className="w-full p-2 border [border-color:#d6e4e7] rounded"
                    placeholder="Alt text (optional)"
                  />
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="px-3 py-1 rounded"
                  >
                    Add Image
                  </button>

                  {errors && <p className="text-red-500 text-sm">{errors}</p>}

                  {form.media.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 h-32 overflow-y-auto">
                      {form.media.map((img, i) => (
                        <div className="relative" key={i}>
                          <img
                            src={img.url}
                            alt={img.alt || `uploaded-${i}`}
                            className="h-20 object-cover aspect-[3/2] rounded"
                          />
                          <button
                            type="button"
                            id="button-delete"
                            onClick={() => deleteImageUrl(i)}
                            className="absolute -top-2 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {step === 3 &&
                renderInput("Maximum guests", "maxGuests", "number")}
              {step === 4 && (
                <>
                  {renderInput("Country", "location.country")}
                  {renderInput("City", "location.city")}
                  {renderInput("Address (optional)", "location.address")}
                </>
              )}
              {step === 5 && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(form.meta).map((key) => (
                    <label
                      htmlFor={key}
                      key={key}
                      className="flex items-center gap-2 capitalize"
                    >
                      <input
                        name={key}
                        type="checkbox"
                        checked={form.meta[key]}
                        onChange={() => toggleAmenity(key)}
                      />
                      {key}
                    </label>
                  ))}
                </div>
              )}
              {step === 6 && renderInput("Price per night", "price", "number")}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded"
              >
                Next
              </button>
            ) : (
              <button type="submit" className="px-4 py-2 bg-green-600 rounded">
                {isCreating ? "Create Listing" : "Update listing"}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
