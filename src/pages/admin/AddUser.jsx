import React from "react";

const AddUser = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card bg-white border-0 rounded-3 mb-4 shadow">
            <div className="card-body p-4">
              <form>
                <div className="row">
                  {/* First Name */}
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-4">
                      <label className="label text-secondary">First Name</label>
                      <input type="text" className="form-control h-55" placeholder="Enter first name" />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-4">
                      <label className="label text-secondary">Last Name</label>
                      <input type="text" className="form-control h-55" placeholder="Enter last name" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-4">
                      <label className="label text-secondary">Email Address</label>
                      <input type="email" className="form-control h-55" placeholder="Enter email address" />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-4">
                      <label className="label text-secondary">Role</label>
                      <select className="form-select form-control h-55">
                        <option defaultValue>Select Role</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </div>

                  {/* Position */}
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-4">
                      <label className="label text-secondary">Position</label>
                      <input type="text" className="form-control h-55" placeholder="Enter position" />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="col-lg-12">
                    <div className="form-group mb-4 only-file-upload">
                      <label className="label text-secondary">Upload Your Image</label>
                      <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
                        <div className="product-upload">
                          <label htmlFor="file-upload" className="file-upload mb-0">
                            <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
                            <span className="d-block text-body fs-14">
                              Drag and drop an image or{" "}
                              <span className="text-primary text-decoration-underline">Browse</span>
                            </span>
                          </label>
                          <label className="position-absolute top-0 bottom-0 start-0 end-0 cursor" id="upload-container">
                            <input className="form__file bottom-0" id="upload-files" type="file" accept="image/*" />
                          </label>
                        </div>
                      </div>
                      <div id="files-list-container"></div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="col-lg-12">
                    <div className="d-flex flex-wrap gap-3">
                      <button type="button" className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
                      <button type="submit" className="btn btn-primary py-2 px-4 fw-medium fs-16">
                        <i className="ri-add-line text-white fw-medium"></i> Add User
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
