import React, { useState } from "react";

const ImmigrationForm = () => {
  const [subApplicants, setSubApplicants] = useState([]);

  const addSubApplicant = () => {
    setSubApplicants([...subApplicants, {}]);
  };

  const removeSubApplicant = (index) => {
    const updated = [...subApplicants];
    updated.splice(index, 1);
    setSubApplicants(updated);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card bg-white border-0 rounded-3 mb-4 shadow">
          <div className="card-body p-4">
            <form>
              <div className="row">
                {/* Assign Section */}
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Assign To</label>
                    <input type="text" className="form-control h-55" placeholder="Enter assignee" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Assign By</label>
                    <input type="text" className="form-control h-55" placeholder="Enter assigner" />
                  </div>
                </div>

                {/* IDs */}
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Internal ID</label>
                    <input type="text" className="form-control h-55" placeholder="Enter internal ID" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">External ID</label>
                    <input type="text" className="form-control h-55" placeholder="Enter external ID" />
                  </div>
                </div>

                {/* Category and Status */}
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Category</label>
                    <select className="form-select form-control h-55">
                      <option>Select category</option>
                      <option value="live">Live</option>
                      <option value="work">Work Visa</option>
                      <option value="study">Study</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Status</label>
                    <select className="form-select form-control h-55">
                      <option>Select status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Applicant Details */}
                <div className="col-lg-12">
                  <h5 className="text-primary mb-3">Applicant Details</h5>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Full Name</label>
                    <input type="text" className="form-control h-55" placeholder="Enter full name" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Date of Birth</label>
                    <input type="date" className="form-control h-55" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Gender</label>
                    <select className="form-select form-control h-55">
                      <option>Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Passport Number</label>
                    <input type="text" className="form-control h-55" placeholder="Enter passport number" />
                  </div>
                </div>

                {/* Education */}
                <div className="col-lg-12">
                  <h5 className="text-primary mb-3">Education</h5>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Highest Qualification</label>
                    <input type="text" className="form-control h-55" placeholder="Enter qualification" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Institution Name</label>
                    <input type="text" className="form-control h-55" placeholder="Enter institution" />
                  </div>
                </div>

                {/* Payment */}
                <div className="col-lg-12">
                  <h5 className="text-primary mb-3">Payment Details</h5>
                </div>
                <div className="col-lg-4">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Amount Paid</label>
                    <input type="number" className="form-control h-55" placeholder="Enter amount" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Payment Date</label>
                    <input type="date" className="form-control h-55" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group mb-4">
                    <label className="label text-secondary">Payment Mode</label>
                    <select className="form-select form-control h-55">
                      <option>Select mode</option>
                      <option>Cash</option>
                      <option>Bank Transfer</option>
                      <option>UPI</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="col-lg-12">
                  <h5 className="text-primary mb-3">Notes</h5>
                  <textarea rows="4" className="form-control mb-4" placeholder="Enter notes..."></textarea>
                </div>

                {/* Sub-Applicants */}
                <div className="col-lg-12">
                  <h5 className="text-primary mb-3">Sub Applicants</h5>
                </div>
                {subApplicants.map((_, index) => (
                  <div key={index} className="border rounded p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="text-secondary mb-3">Sub Applicant #{index + 1}</h6>
                      <button type="button" onClick={() => removeSubApplicant(index)} className="btn btn-sm btn-danger">Remove</button>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label className="label text-secondary">External ID</label>
                          <input type="text" className="form-control h-55" placeholder="Enter external ID" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label className="label text-secondary">Full Name</label>
                          <input type="text" className="form-control h-55" placeholder="Enter name" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label className="label text-secondary">Category</label>
                          <select className="form-select form-control h-55">
                            <option>Select category</option>
                            <option value="live">Live</option>
                            <option value="work">Work Visa</option>
                            <option value="study">Study</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label className="label text-secondary">Status</label>
                          <select className="form-select form-control h-55">
                            <option>Select status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="label text-secondary">Education</label>
                          <input type="text" className="form-control h-55" placeholder="Enter qualification" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label className="label text-secondary">Amount Paid</label>
                          <input type="number" className="form-control h-55" placeholder="Enter amount" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label className="label text-secondary">Payment Date</label>
                          <input type="date" className="form-control h-55" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="label text-secondary">Notes</label>
                          <textarea rows="3" className="form-control" placeholder="Enter notes..."></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-lg-12 mb-4">
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={addSubApplicant}>
                    + Add Sub Applicant
                  </button>
                </div>

                {/* Submit */}
                <div className="col-lg-12">
                  <div className="d-flex flex-wrap gap-3">
                    <button type="button" className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
                    <button type="submit" className="btn btn-primary py-2 px-4 fw-medium fs-16">
                      <i className="ri-add-line text-white fw-medium"></i> Create File
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

export default ImmigrationForm;
