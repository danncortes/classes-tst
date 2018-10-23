export class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.quizzes = [];
  }
}

export class Teacher {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.quizzes = [];
    this.classes = [];
  }

  createQuiz(id, name, classId, qna) {
    this.quizzes.push(new Quiz(id, name, classId, qna));
  }
}

export class Classes {
  constructor(id, name, students) {
    this.id = id;
    this.name = name;
    this.students = students;
  }
}

export class Qna {
  constructor(id, question, options, answers) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.answers = answers;
  }
}

export class Quiz {
  constructor(id, name, classId, qna) {
    this.id = id;
    this.classId = classId;
    this.name = name;
    this.qna = qna;
  }

  assignQuiz(studentId) {
    const studentIndx = students.findIndex(stud => stud.id === studentId);
    const quizToSave = {
      id: this.id,
      name: this.name,
      class: this.classId,
      qualification: 0,
      submitAnswer: this.submitAnswer,
      baseQualification: 100,
      qna: this.qna.map(q => ({
        id: q.id,
        rightAnswers: q.answers,
        studentAnswer: [],
      })),
    };
    students[studentIndx].quizzes.push(quizToSave);
  }

  submitAnswer(qnaId, answer) {
    const qIndex = this.qna.findIndex(q => q.id === qnaId);
    if (qIndex >= 0) {
      this.qna[qIndex].studentAnswer = [...answer.sort()];
      const nQuestions = this.qna.length;
      let points = 0;
      const question = this.qna.find(qNa => qNa.id === qnaId);
      points = question.rightAnswers.toString() === question.studentAnswer.toString() ? 1 : 0;
      this.qualification += Number(parseFloat(points * this.baseQualification / nQuestions).toFixed(2));
    }
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

teachers[0].classes = [
  new Classes(1, 'Maths', [1, 2, 3]),
  new Classes(2, 'workout', [3, 4, 5]),
  new Classes(3, 'Physic', [4, 5, 6]),
];

const qnaQuiz1 = [
  new Qna(1, '2 countries in america', ['Argentina', 'usa', 'italy', 'Rusia'], [0, 1]),
  new Qna(2, '2 countries in Asia', ['Chile', 'Nigeria', 'China', 'Japan'], [2, 3]),
  new Qna(3, '2 countries in Africa', ['Camerun', 'Brasil', 'China', 'Nigeria'], [0, 2]),
];

teachers[0].createQuiz(1, 'Countries In continents', 1, qnaQuiz1);

teachers[0].quizzes[0].assignQuiz(1);
students[0].quizzes[0].submitAnswer(1, [0, 1]);
students[0].quizzes[0].submitAnswer(2, [0, 1]);
console.log(students[0]);
// students[1].submitQuizAnswer(1, 2, [0, 1]);
// console.log(students[1]);
