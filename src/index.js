export class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  submitAnswer(classes, classId, quizId, qnaId, answer) {
    const classIndex = classes.findIndex(cls => cls.id === classId);
    if (classIndex !== undefined) {
      const studentIndex = classes[classIndex].students.findIndex(st => st.id === this.id);
      if (studentIndex !== undefined) {
        const quizzIndex = classes[classIndex].students[studentIndex].quizzes.findIndex(qz => qz.id === quizId);
        if (quizzIndex !== undefined) {
          classes[classIndex].students[studentIndex].quizzes[quizzIndex].submitAnswer(qnaId, answer);
        }
      }
    }
  }
}

export class Teacher {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  createQuiz(classes, id, name, classId, qna) {
    const classIndex = classes.findIndex(cls => cls.id === classId);
    if (classIndex != undefined) {
      classes[classIndex].addQuizz(id, name, qna);
    }
  }
}

class quizToSave {
  constructor(id, name, qa, qna) {
    this.id = id;
    this.name = name;
    this.qualification = 0;
    this.baseQualification = qa;
    this.qna = qna.map(q => ({
      id: q.id,
      rightAnswers: q.answers,
      studentAnswer: [],
    }));
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

export class Classes {
  constructor(id, name, teacherId, students) {
    this.id = id;
    this.name = name;
    this.teacherId = teacherId;
    this.students = this.createStudents(students);
    this.quizzes = [];
  }

  createStudents(students) {
    const structure = [];
    students.forEach((el) => {
      structure.push({ id: el, quizzes: [] });
    });
    return structure;
  }

  addQuizz(id, name, qna) {
    this.quizzes.push(new Quiz(id, name, qna));
    this.students.forEach((student, key) => {
      const quiz = new quizToSave(id, name, 100, qna);
      this.students[key].quizzes.push(quiz);
    });
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
  constructor(id, name, qna) {
    this.id = id;
    this.name = name;
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
];

const qnaQuiz1 = [
  new Qna(1, '2 countries in america', ['Argentina', 'usa', 'italy', 'Rusia'], [0, 1]),
  new Qna(2, '2 countries in Asia', ['Chile', 'Nigeria', 'China', 'Japan'], [2, 3]),
  new Qna(3, '2 countries in Africa', ['Camerun', 'Brasil', 'China', 'Nigeria'], [0, 2]),
];

const qnaQuiz2 = [
  new Qna(1, '2 cities in america', ['NY', 'Medellin', 'Rome', 'Madrid'], [0, 1]),
  new Qna(2, '2 cities in Asia', ['Manila', 'Berlin', 'Tokio', 'Sao Paulo'], [0, 2]),
  new Qna(3, '1 city in Africa', ['Nairobi', 'Buenos Aires', 'Chicago', 'Barcelona'], [0]),
];

teachers[0].createQuiz(classes, 1, 'Countries In continents', 1, qnaQuiz1);
students[1].submitAnswer(classes, 1, 1, 3, [0, 2]);
