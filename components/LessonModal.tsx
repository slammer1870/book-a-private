const LessonModal = (selectedDate: Date) => {
  const handleSubmit = async () => {
    const res = await fetch("", {});

    const data = await res.json();
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <form className="w-full max-w-screen-sm bg-white rounded p-4">
        <h5 className="text-xl font-medium mb-2">
          Add a new lesson for {selectedDate.toDateString()}
        </h5>
        <div className="flex flex-col mb-4">
          <span className="font-semibold text-sm mb-2">Time:</span>
          <input className="text-sm font-medium p-2 border rounded" />
        </div>
        <div className="flex flex-col mb-4">
          <span className="font-semibold text-sm mb-2">Location:</span>
          <input className="text-sm font-medium p-2 border rounded" />
        </div>
        <div className="flex flex-col mb-4">
          <span className="font-semibold text-sm mb-2">Price:</span>
          <input className="text-sm font-medium p-2 border rounded" />
        </div>
        <button className="rounded bg-indigo-400 w-full text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LessonModal;
