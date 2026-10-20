exports.globalErrorHendleing = (err, req, res, next) => {
  // return res.status(500).json({success: false , message: err.message || 'someting went wrong'})

  if (err?.code === 11000) {
    const duplicateFields = Object.keys(err.keyPattern || {});
    return res.status(409).json({
      success: false,
      message: `${duplicateFields.join(", ") || "Record"} already exists`,
    });
  }

  if (err.name === "ValidationError") {
    const errors = {}
    Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message
    });
    return res.status(400).json({ success: false, message: errors });
  }else if(err.message){
 return res.status(500).json({ success: false, message: err.message });
  }else{
     return res.status(500).json({success: false , message: "someting went wrong"});

  }

};
