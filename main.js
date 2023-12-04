let lesson = {};

function onSubmitHandler(event) {
  event.preventDefault();

  const lessonCode = document.getElementById('lesson-code');
  const lessonName = document.getElementById('lesson-name');
  const lessonType = document.getElementsByClassName('lesson-type');
  const unitNum = document.getElementById('unit-num');
  const prerequisite = document.getElementsByClassName('prerequisite');

  lesson.code = lessonCode.value;
  lesson.name = lessonName.value;
  lesson.unitNum = unitNum.value;

  for (let i = 0; i < lessonType.length; i++) {
    if (lessonType.item(i).checked) {
      lesson.type = lessonType.item(i).id;
    }
  }

  for (let i = 0; i < prerequisite.length; i++) {
    if (prerequisite.item(i).checked) {
      lesson.prerequisite = prerequisite.item(i).id;
    }
  }

  let oldData = JSON.parse(localStorage.getItem('lessons')) || [];

  oldData.push(lesson);

  localStorage.setItem('lessons', JSON.stringify(oldData));

  alert('درس با موفقیت اضافه شد');
}
