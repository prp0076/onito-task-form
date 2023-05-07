import { useForm } from "react-hook-form";
import axios from "axios"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import 'bootstrap/dist/css/bootstrap.min.css';


export const Form = () => {


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required"),
    sex: Yup.string().required("Sex is required"),
    govtIssuedId: Yup.string(),
    govtIdNumber: Yup.string().when("govtIssuedId", {
      is: "aadhar",
      then:()=> Yup.string().required("Aadhar number is required").matches(/^\d{12}$/, "Invalid Aadhar number"),
      otherwise:()=> Yup.string().required("Govt Id number is required").matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, "Invalid PAN number"),
    }),
    mobileNumber: Yup.string().required("Mobile number is required").matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
    guardianName: Yup.string(),
    guardianDetails: Yup.string(),
    email: Yup.string().email("Invalid email address"),
    emergencyContactNumber: Yup.string().required("Emergency contact number is required").matches(/^[6-9]\d{9}$/, "Invalid emergency contact number"),
    occupation: Yup.string(),
    religion: Yup.string(),
    maritalStatus: Yup.string(),
    bloodGroup: Yup.string(),
    nationality: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const handleCancel = () => {
  //   history.push("/user-table");
  // }; 
  // const history = useHistory();
  const onSubmit = (data) => {
    //post method
    axios.post('http://localhost:5000/api/submit', data)
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
    // console.log(data)
      console.error(error);
    });
  };
  

  return (
    <form className="container w-75 m-auto  row" onSubmit={handleSubmit(onSubmit)}>
     <h2 className="text-dark my-1 text-decoration-underline mt-3">Personal Details</h2>
      <label className="text-dark fw-normal col-md-1 " htmlFor="name">Name <span className="text-danger">*</span> </label>
      <input className="my-2 col-md-3 rounded" type="text" placeholder="Enter Name"{...register("name")} name="name"/>
      {errors.name && <p>{errors.name.message}</p>}

      <label className="my-2 col-md-1" htmlFor="age">Age <span className="text-danger">*</span> </label>
      <input className="my-2 col-md-3 rounded" type="number" placeholder="DD/MM/YYYY or age in Years" {...register("age")} name="age"/>
      {errors.age && <p>{errors.age.message}</p>}

      <label className="my-2 col-md-1" htmlFor="sex">Sex <span className="text-danger">*</span> </label>
      <select className="my-2 col-md-3 rounded" {...register("sex")} name="sex">
        <option value="" >Enter sex</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.sex && <p>{errors.sex.message}</p>}

      <label className="my-2 col-md-2" htmlFor="govtIssuedId">Govt Issued ID</label>
      <select className="my-2 col-md-2 h-50 rounded" {...register("govtIssuedId")} name="govtIssuedId">
        <option value="">ID Type</option>
        <option value="aadhar">Aadhar</option>
        <option value="pan">PAN</option>
      </select>
      {errors.govtIssuedId && <p>{errors.govtIssuedId.message}</p>}

      <label className="my-2 col-md-1" htmlFor="govtIdNumber"></label>
      <input className="my-2 col-md-3 h-50 rounded" type="text" {...register("govtIdNumber")} name="govtIdNumber" placeholder="Enter Govt ID"/>
      {errors.govtIdNumber && <p>{errors.govtIdNumber.message}</p>}

      <label className="my-2 col-md-2" htmlFor="mobileNumber">Mobile Number <span className="text-danger">*</span> </label>
      <input className="my-2 col-md-2 h-50 rounded" type="text" {...register("mobileNumber")} name="mobileNumber"/>
      {errors.mobileNumber && <p>{errors.mobileNumber.message}</p>}


      <h2 className="text-dark my-1 text-decoration-underline mt-3">Address Details</h2>
      
      <label className="my-2 col-md-1" htmlFor="address">Address</label>
      <input className="my-2 col-md-3 rounded" type="text" id="address" name="address" ></input>
      <label className="my-2 col-md-1" htmlFor="state">State</label>
      <input className="my-2 col-md-3 rounded" type="text" id="state" name="address.state" {...register("address.state")}></input>
      <label className="my-2 col-md-1" htmlFor="city">City</label>
      <input className="my-2 col-md-3 rounded" type="text" id="city" name="address.city" {...register("address.city")}></input>
      <label className="my-2 col-md-1" htmlFor="country">Country</label>
      <input className="my-2 col-md-3 rounded" type="text" id="country" name="address.country" {...register("address.country")}></input>
      <label className="my-2 col-md-1" htmlFor="pincode">Pincode</label>
      <input className="my-2 col-md-3 rounded" name="address.pincode" id="pincode" type="number" {...register("address.pincode")}></input>

      <h2 className="text-dark my-1 text-decoration-underline mt-3">Contact Details</h2>

      <label className="my-2 col-md-1" htmlFor="guardianName">Guardian Name</label>
      <select className="my-2 col-md-1 h-50 rounded" {...register("guardianName")} name="guardianName">
        <option value="">Select</option>
        <option value="father">Father</option>
        <option value="mother">Mother</option>
        <option value="other">Other</option>
      </select>
      <label className="my-2 col-md-1" htmlFor="guardianDetails"></label>
      <input className="my-2 col-md-2 h-50 rounded" type="text" 
       placeholder="Enter gurdian name"{...register("guardianDetails")} name="guardianDetails"></input>
      <label className="my-2 col-md-1 " htmlFor="email">Email</label>
      <input className="my-2 col-md-2 h-50 rounded" type="text" {...register("email")} name="email"></input>
      {errors.email && <p>{errors.email.message}</p>}
      <label className="my-2 col-md-2" htmlFor="emergencyContactNumber">Emergency Contact Number</label>
      <input className="my-2 col-md-2 h-50 rounded" type="text" placeholder="Enter Emergency No" {...register("emergencyContactNumber")} name="emergencyContactNumber"></input>
      {errors.emergencyContactNumber && <p>{errors.emergencyContactNumber.message}</p>}
      <h2 className="text-dark my-1 text-decoration-underline mt-3">Other Details</h2>

      <label className="my-2 col-md-1 px-md-1" htmlFor="occupation">Occupation</label>
      <input className="my-2 col-md-2 h-50 rounded" type="text" {...register("occupation")} name="occupation"></input>
      <label className="my-2 col-md-1" htmlFor="religion">Religion</label>
      <input className="my-2 col-md-2 h-50 rounded" type="text" {...register("religion")} name="religion"></input>
      
      <label className="my-2 col-md-1" htmlFor="maritalStatus">Marital Status</label>
      <input className="my-2 col-md-2 h-50  rounded" type="text" {...register("maritalStatus")}  name="maritalStatus"></input>
      <label className="my-2 col-md-1" htmlFor="bloodGroup">Blood Group</label>
      <input className="my-2 col-md-2 h-50 rounded" type="text" {...register("bloodGroup")} name="bloodGroup"></input>
      <label className="my-2 col-md-1 px-md-1" htmlFor="nationality">Nationality</label>
      <input className="my-2 col-md-2 rounded" type="text" {...register("nationality")} name="nationality"></input>
      
      {/* submit and cecle face  */} 
     <div className="col-md-12 d-flex justify-content-end">
      <label className="my-2 col-md-1" htmlFor="submit"></label>
      <input className="my-2 col-md-2 mx-md-5 rounded btn-success btn" type="submit" id="submit"></input>
      <label className="m-2 col-md-1" htmlFor="cencle"></label>
      <input className="my-2 col-md-2 btn border-danger text-danger btn-white rounded " type="reset" id="cencle" value="Cancel" />
      </div>
      
    </form>
  )  
}

