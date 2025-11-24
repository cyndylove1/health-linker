import SelectTag from "../form/selectTag";

export default function JobFilter() {
  return (
    <div className="overflow-x-auto lg:overflow-visible">
      <div className="grid grid-cols-6 gap-[15px] min-w-max lg:min-w-0">
        <SelectTag title="Job Location" options={["USA", "Canada", "Remote"]} />
        <SelectTag title="Industry" options={["Tech", "Health", "Finance"]} />
        <SelectTag
          title="Work Type"
          options={["Full-Time", "Part-Time", "Contract"]}
        />
        <SelectTag
          title="Experience level"
          options={["USA", "Canada", "Remote"]}
        />
        <SelectTag
          title="Date Posted"
          options={["Tech", "Health", "Finance"]}
        />
        <SelectTag
          title="Remote Only"
          options={["Full-Time", "Part-Time", "Contract"]}
        />
      </div>
    </div>
  );
}
