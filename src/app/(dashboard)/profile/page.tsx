import Btn from "@/components/button/btn";
import CustomSelect from "@/components/form/customSelect";
import Label from "@/components/form/label";
import Title from "@/components/ui/title";

export default function ProfileSection() {
  const WorkOptions = [{ value: "Work", label: "Surgeon" }];
  const CountryOptions = [{ value: "Country", label: "USA" }];
  return (
    <div className="md:px-6 px-4">
      <Title text="Profile" />
      <div className="w-full bg-white py-10 my-6 md:px-6 px-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src="/Mask Group.png"
              alt="profile"
              className="h-[112px] w-[112px] rounded-full"
            />
          </div>

          {/* Form */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full">
            <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
              <Label text="First Name" className="pt-2" />

              <input
                type="text"
                className="rounded-md h-[48px] outline-none pt-[5px]"
              />
            </div>

            <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
              <Label text="Last Name" className="pt-2" />
              <input
                type="text"
                className="rounded-md h-[48px] outline-none pt-[5px]"
              />
            </div>

            <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
              <Label text="Email" className="pt-2" />
              <input
                type="email"
                className="rounded-md h-[48px] outline-none pt-[5px]"
              />
            </div>

            <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
              <Label text="Phone Number" className="pt-2" />
              <input
                type="text"
                className="rounded-md h-[48px] outline-none pt-[5px]"
              />
            </div>
            <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
              <div>
                <Label text="Country" className="pt-2" />
                <CustomSelect options={CountryOptions} placeholder="Country" />
              </div>
            </div>

            <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
              <div>
                <Label text="What do you do?" className="pt-2" />
                <CustomSelect options={WorkOptions} placeholder="Surgeon" />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Btn
            type="submit"
            className="h-[40px] w-full md:w-[161px] rounded-[100px] bg-[#8dceba] text-white font-[600] hover:bg-[#078e63]"
            text="Save Changes"
          />
        </div>
      </div>
    </div>
  );
}
