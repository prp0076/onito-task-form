import { useForm } from "react-hook-form";
import axios from "axios"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Details</h2>
      <label htmlFor="name">Name *</label>
      <input type="text" {...register("name")} name="name"/>
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="age">Age *</label>
      <input type="number" {...register("age")} name="age"/>
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="sex">Sex *</label>
      <select {...register("sex")} name="sex">
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.sex && <p>{errors.sex.message}</p>}

      <label htmlFor="govtIssuedId">Govt Issued ID</label>
      <select {...register("govtIssuedId")} name="govtIssuedId">
        <option value="">Select</option>
        <option value="aadhar">Aadhar</option>
        <option value="pan">PAN</option>
      </select>
      {errors.govtIssuedId && <p>{errors.govtIssuedId.message}</p>}

      <label htmlFor="govtIdNumber">Govt Id Number</label>
      <input type="text" {...register("govtIdNumber")} name="govtIdNumber"/>
      {errors.govtIdNumber && <p>{errors.govtIdNumber.message}</p>}

      <label htmlFor="mobileNumber">Mobile Number *</label>
      <input type="text" {...register("mobileNumber")} name="mobileNumber"/>
      {errors.mobileNumber && <p>{errors.mobileNumber.message}</p>}


      <h2>Address Details</h2>
      
      <label htmlFor="address">Address</label>
      <input type="text" id="address" name="address" ></input>
      <label htmlFor="state">State</label>
      <input type="text" id="state" name="address.state" {...register("address.state")}></input>
      <label htmlFor="city">City</label>
      <input type="text" id="city" name="address.city" {...register("address.city")}></input>
      <label htmlFor="country">Country</label>
      <input type="text" id="country" name="address.country" {...register("address.country")}></input>
      <label htmlFor="pincode">Pincode</label>
      <input name="address.pincode" id="pincode" type="number" {...register("address.pincode")}></input>

      <h2>Contact Details</h2>

      <label htmlFor="guardianName">Guardian Name</label>
      <select {...register("guardianName")} name="guardianName">
        <option value="">Select</option>
        <option value="father">Father</option>
        <option value="mother">Mother</option>
        <option value="other">Other</option>
      </select>
      <label htmlFor="guardianDetails"></label>
      <input type="text" {...register("guardianDetails")} name="guardianDetails"></input>
      <label htmlFor="email">Email</label>
      <input type="text" {...register("email")} name="email"></input>
      {errors.email && <p>{errors.email.message}</p>}
      <label htmlFor="emergencyContactNumber">Emergency Contact Number</label>
      <input type="text" {...register("emergencyContactNumber")} name="emergencyContactNumber"></input>
      {errors.emergencyContactNumber && <p>{errors.emergencyContactNumber.message}</p>}
      <h2>Other Details</h2>

      <label htmlFor="occupation">Occupation</label>
      <input type="text" {...register("occupation")} name="occupation"></input>
      <label htmlFor="religion">Religion</label>
      <input type="text" {...register("religion")} name="religion"></input>
      
      <label htmlFor="maritalStatus">Marital Status</label>
      <input type="text" {...register("maritalStatus")}  name="maritalStatus"></input>
      <label htmlFor="bloodGroup">Blood Group</label>
      <input type="text" {...register("bloodGroup")} name="bloodGroup"></input>
      <label htmlFor="nationality">Nationality</label>
      <input type="text" {...register("nationality")} name="nationality"></input>
      
      {/* submit and cecle face */}
      <label htmlFor="submit"></label>
      <input type="submit" id="submit"></input>
      <label htmlFor="cencle"></label>
      <input type="reset" id="cencle" value="Cancel" />
    </form>
  )  
}


