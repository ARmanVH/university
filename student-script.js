function showUnits() {
  const unitsSelected = JSON.parse(localStorage.getItem('units-selected'));
  const lessons = JSON.parse(localStorage.getItem('lessons'));
  const tableBody = document.getElementById('table-body-units');

  const wholeUnits = unitsSelected?.map((u) => {
    console.log(u);
    const findLesson = lessons.find((l) => l.code === u.lessonCode);

    return {
      studentId: u.studentId,
      ...findLesson,
    };
  });

  tableBody.innerHTML = '';

  wholeUnits?.forEach((item) => {
    let type = '';

    if (item.type === 'public') {
      type = 'عمومی';
    } else if (item.type === 'exclusive') {
      type = 'اختصاصی';
    } else {
      type = 'اختیاری';
    }

    let prerequisite = '';

    if (item.prerequisite === 'true') {
      prerequisite = 'دارد';
    } else {
      prerequisite = 'ندارد';
    }

    tableBody.innerHTML += `<tr
    class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    ><td
    class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
    >${item.studentId}</td
  ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${item.code}</td
    ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${item.name}</td
    ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${type}</td
    ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${item.unitNum}</td
    ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${prerequisite}</td
    ></tr
  >`;
  });
}

showUnits();

const tableBody = document.getElementById('table-body');

const lessons = JSON.parse(localStorage.getItem('lessons'));

lessons.forEach((item) => {
  let type = '';

  if (item.type === 'public') {
    type = 'عمومی';
  } else if (item.type === 'exclusive') {
    type = 'اختصاصی';
  } else {
    type = 'اختیاری';
  }

  let prerequisite = '';

  if (item.prerequisite === 'true') {
    prerequisite = 'دارد';
  } else {
    prerequisite = 'ندارد';
  }

  tableBody.innerHTML += `<tr
    class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${item.code}</td
    ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${item.name}</td
    ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${type}</td
    ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${item.unitNum}</td
    ><td
      class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"
      >${prerequisite}</td
    ></tr
  >`;
});

function onSubmitHandler(event) {
  event.preventDefault();

  const studentId = document.getElementById('student-id');
  const lessonCode = document.getElementById('lesson-code');

  if (studentId.value.length < 10 && studentId.value.length > 10) {
    return alert('شماره دانشجویی باید 10 رقم باشد');
  }

  const findLesson = lessons.find((l) => l.code === lessonCode.value);

  if (!findLesson) {
    return alert('درس مورد نظر وجود ندارد');
  }

  if (findLesson.prerequisite === 'true') {
    return alert('این درس پیش نیاز دارد');
  }

  const unitsSelected =
    JSON.parse(localStorage.getItem('units-selected')) || [];

  const findUnit = unitsSelected.find(
    (u) => u.lessonCode === lessonCode.value && u.studentId === studentId.value,
  );
  console.log(findUnit);

  if (findUnit) {
    return alert('این درس قبلا انتخاب شده است');
  }

  const units = unitsSelected.map((u) => u.studentId === studentId.value);

  const unitSum =
    units.reduce((acc, item) => +acc + +item.unitNum, 0) + findLesson.unitNum;

  if (unitSum > 18) {
    return alert('شما نمیتوانید بیشتر از 18 واحد انتخاب کنید');
  }

  unitsSelected.push({
    studentId: studentId.value,
    lessonCode: lessonCode.value,
  });

  console.log(unitsSelected);

  localStorage.setItem('units-selected', JSON.stringify(unitsSelected));

  showUnits();

  alert('واحد با موفقیت اضافه شد');
}
