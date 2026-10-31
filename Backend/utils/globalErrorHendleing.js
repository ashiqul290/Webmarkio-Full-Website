exports.globalErrorHendleing = (err, req, res, next) => {
<<<<<<< HEAD
=======
  // return res.status(500).json({success: false , message: err.message || 'someting went wrong'})

>>>>>>> origin/main
  if (err?.code === 11000) {
    const duplicateFields = Object.keys(err.keyPattern || {});
    return res.status(409).json({
      success: false,
      message: `${duplicateFields.join(", ") || "Record"} already exists`,
    });
  }

<<<<<<< HEAD
  if (err?.name === "ValidationError") {
=======
  if (err.name === "ValidationError") {
>>>>>>> origin/main
    const errors = {}
    Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message
    });
    return res.status(400).json({ success: false, message: errors });
<<<<<<< HEAD
  }
  if (err?.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid request value." });
  }
  if (Number.isInteger(err?.status) && err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ success: false, message: "Invalid request." });
  }

  console.error("Unhandled API error", {
    name: err?.name || "Error",
    method: req.method,
    path: req.originalUrl,
  });
  return res.status(500).json({ success: false, message: "Something went wrong." });
=======
  }else if(err.message){
 return res.status(500).json({ success: false, message: err.message });
  }else{
     return res.status(500).json({success: false , message: "someting went wrong"});

  }

>>>>>>> origin/main
};
