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
