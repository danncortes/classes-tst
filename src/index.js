export class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export class Teacher {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  createQuiz(id, arr, name, qna) {
    arr.push(new Quiz(id, this, name, qna));
  }
}

export class Classes {
  constructor(id, name, teacher, students) {
    this.id = id;
    this.name = name;
    this.teacher = teacher;
    this.students = students;
  }
}

export class Qna {
  constructor(question, options, answers) {
    this.question = question;
    this.options = options;
    this.answers = answers;
  }
}

export class Quiz {
  constructor(id, teacher, name, qna) {
    this.id = id;
    this.name = name;
    this.teacher = teacher;
    this.qna = qna;
  }
}

const teachers = [
  new Teacher(1, 'X professor'),
  new Teacher(2, 'Logan James'),
  new Teacher(3, 'Erik Lehnsherr'),
];

const students = [
  new Student(1, 'Jhon'),
  new Student(2, 'Peter'),
  new Student(3, 'Anna'),
  new Student(4, 'Rebecca'),
  new Student(5, 'Tom'),
  new Student(6, 'Rick'),
];

const classes = [
  new Classes(1, 'Maths', 1, [1, 2, 3]),
  new Classes(1, 'workout', 2, [3, 4, 5]),
  new Classes(1, 'Physic', 3, [4, 5, 6]),
];

const quizzes = [];

const qnaQuiz1 = [
  new Qna('2 countries in america', ['Argentina', 'usa', 'italy', 'Rusia'], [0, 1]),
  new Qna('2 countries in Asia', ['Chile', 'Nigeria', 'China', 'Japan'], [2, 3]),
  new Qna('2 countries in Africa', ['Camerun', 'Brasil', 'China', 'Nigeria'], [0, 2]),
];

teachers[0].createQuiz(1, quizzes, 'Countries In continents', qnaQuiz1);
