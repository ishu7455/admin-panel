import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRoles, fetchUserById, createOrUpdateUser, File_BASE } from "../../api/adminApi";

const AddUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role_id: "",
    position: "",
    image: null,
  });

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [existingImage, setExistingImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchRoles().then(setRoles);

    if (id) {
      fetchUserById(id)
        .then((user) => {
          if (user) {
            setForm({
              first_name: user.first_name || "",
              last_name: user.last_name || "",
              email: user.email || "",
              role_id: user.role_id || "",
              position: user.position || "",
              image: null,
              id: user.id,
            });
            setExistingImage(user.image || null);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }
  }, [id]);

  // Cleanup preview URL on unmount/change
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      const file = files[0];
      setPreviewImage(URL.createObjectURL(file));
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(form).forEach(([key, val]) => {
      if (val !== null) data.append(key, val);
    });

    try {
      const res = await createOrUpdateUser(data);
      alert(res.message);
      navigate("/user-list");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error("Error:", err);
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card bg-white border-0 rounded-3 mb-4 shadow">
          <div className="card-body p-4">

            <div className="pb-3 pt-3">
               <h3>Add User</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">

                {/* First Name */}
                <div className="col-lg-6 col-sm-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">First Name</label>
                    <input type="text" name="first_name" value={form.first_name} onChange={handleChange} className="form-control h-55" placeholder="Enter first name" />
                    {errors.first_name && <div className="text-danger mt-1">{errors.first_name[0]}</div>}
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-lg-6 col-sm-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Last Name</label>
                    <input type="text" name="last_name" value={form.last_name} onChange={handleChange} className="form-control h-55" placeholder="Enter last name" />
                    {errors.last_name && <div className="text-danger mt-1">{errors.last_name[0]}</div>}
                  </div>
                </div>

                {/* Email */}
                <div className="col-lg-6 col-sm-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control h-55" placeholder="Enter email address" />
                    {errors.email && <div className="text-danger mt-1">{errors.email[0]}</div>}
                  </div>
                </div>

                {/* Role */}
                <div className="col-lg-6 col-sm-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Role</label>
                    <select name="role_id" value={form.role_id} onChange={handleChange} className="form-select form-control h-55">
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                    {errors.role_id && <div className="text-danger mt-1">{errors.role_id[0]}</div>}
                  </div>
                </div>

                {/* Position */}
                <div className="col-lg-6 col-sm-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Position</label>
                    <input type="text" name="position" value={form.position} onChange={handleChange} className="form-control h-55" placeholder="Enter position" />
                    {errors.position && <div className="text-danger mt-1">{errors.position[0]}</div>}
                  </div>
                </div>

                {/* Image Upload with Preview */}
                <div className="col-lg-12">
                  <div className="form-group mb-4 only-file-upload">
                    <label className="label text-secondary">Upload Your Image</label>
                    {(previewImage || existingImage) && (
                      <div className="mb-2">
                        <img
                          src={previewImage || `${File_BASE}/storage/${existingImage}`}
                          alt="Preview"
                          style={{ maxWidth: 100, borderRadius: 6 }}
                        />
                      </div>
                    )}
                    <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
                      <div className="product-upload">
                        <label htmlFor="file-upload" className="file-upload mb-0">
                          <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
                          <span className="d-block text-body fs-14">
                            Drag and drop or <span className="text-primary text-decoration-underline">Browse</span>
                          </span>
                        </label>
                        <label className="position-absolute top-0 bottom-0 start-0 end-0 cursor">
                          <input className="form__file" id="upload-files" name="image" type="file" accept="image/*" onChange={handleChange} />
                          {errors.image && <div className="text-danger mt-1">{errors.image[0]}</div>}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="col-lg-12">
                  <div className="d-flex flex-wrap gap-3">
                    <button type="button" onClick={() => navigate("/admin/users")} className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
                    <button type="submit" className="btn btn-primary py-2 px-4 fw-medium fs-16">
                      <i className="ri-add-line text-white fw-medium"></i> {id ? "Update User" : "Add User"}
                    </button>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
