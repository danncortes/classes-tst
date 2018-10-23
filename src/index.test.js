import {
  Teacher, Student, Classes, Qna,
} from './index';

describe('Test School Models', () => {
  let teachers = [];
  let students = [];

  teachers = [
    new Teacher(1, 'X professor'),
    new Teacher(2, 'Logan James'),
    new Teacher(3, 'Erik Lehnsherr'),
  ];

  students = [
    new Student(1, 'Jhon'),
    new Student(2, 'Peter'),
    new Student(3, 'Anna'),
    new Student(4, 'Rebecca'),
    new Student(5, 'Tom'),
    new Student(6, 'Rick'),
  ];

  it('Should have Teachers', () => {
    const expected = [
      { id: 1, name: 'X professor' },
      { id: 2, name: 'Logan James' },
      { id: 3, name: 'Erik Lehnsherr' },
    ];

    expect(teachers).toEqual(expected);
  });

  it('Should have Students', () => {
    const expected = [
      { id: 1, name: 'Jhon' },
      { id: 2, name: 'Peter' },
      { id: 3, name: 'Anna' },
      { id: 4, name: 'Rebecca' },
      { id: 5, name: 'Tom' },
      { id: 6, name: 'Rick' },
    ];
    expect(students).toEqual(expected);
  });

  it('Should have Classes', () => {
    const classes = [
      new Classes(1, 'Maths', 1, [1, 2, 3]),
    ];
    const expected = [
      {
        id: 1,
        name: 'Maths',
        teacherId: 1,
        quizzes: [],
        students: [
          { id: 1, quizzes: [], grade: 0 },
          { id: 2, quizzes: [], grade: 0 },
          { id: 3, quizzes: [], grade: 0 },
        ],
      },
    ];
    expect(classes).toEqual(expected);
  });

  describe('Testing quizzes', () => {
    const qnaQuiz1 = [
      new Qna(1, '2 countries in america', ['Argentina', 'usa', 'italy', 'Rusia'], [0, 1]),
      new Qna(2, '2 countries in Asia', ['Chile', 'Nigeria', 'China', 'Japan'], [2, 3]),
      new Qna(3, '2 countries in Africa', ['Camerun', 'Brasil', 'China', 'Nigeria'], [0, 2]),
    ];

    const classes = [
      new Classes(1, 'Maths', 1, [1, 2, 3]),
    ];

    it('Should create quizzes and assing to students', () => {
      teachers[0].createQuiz(classes, 1, 'Countries In continents', 1, qnaQuiz1);

      const expected = [
        {
          id: 1,
          name: 'Maths',
          teacherId: 1,
          quizzes: [{
            id: 1,
            name: 'Countries In continents',
            qna: [{
              id: 1,
              question: '2 countries in america',
              options: ['Argentina', 'usa', 'italy', 'Rusia'],
              answers: [0, 1],
            },
            {
              id: 2,
              question: '2 countries in Asia',
              options: ['Chile', 'Nigeria', 'China', 'Japan'],
              answers: [2, 3],
            },
            {
              id: 3,
              question: '2 countries in Africa',
              options: ['Camerun', 'Brasil', 'China', 'Nigeria'],
              answers: [0, 2],
            }],
          }],
          students: [
            {
              id: 1,
              grade: 0,
              quizzes: [{
                id: 1,
                name: 'Countries In continents',
                qualification: 0,
                baseQualification: 100,
                qna: [{ id: 1, rightAnswers: [0, 1], studentAnswer: [] },
                  { id: 2, rightAnswers: [2, 3], studentAnswer: [] },
                  { id: 3, rightAnswers: [0, 2], studentAnswer: [] }],
              }],
            },
            {
              id: 2,
              grade: 0,
              quizzes: [{
                id: 1,
                name: 'Countries In continents',
                qualification: 0,
                baseQualification: 100,
                qna: [{ id: 1, rightAnswers: [0, 1], studentAnswer: [] },
                  { id: 2, rightAnswers: [2, 3], studentAnswer: [] },
                  { id: 3, rightAnswers: [0, 2], studentAnswer: [] }],
              }],
            },
            {
              id: 3,
              grade: 0,
              quizzes: [{
                id: 1,
                name: 'Countries In continents',
                qualification: 0,
                baseQualification: 100,
                qna: [{ id: 1, rightAnswers: [0, 1], studentAnswer: [] },
                  { id: 2, rightAnswers: [2, 3], studentAnswer: [] },
                  { id: 3, rightAnswers: [0, 2], studentAnswer: [] }],
              }],
            },
          ],
        },
      ];
      expect(classes).toEqual(expected);
    });

    it('Should student submit answer and calculate current grade in class', () => {
      const expected = [
        {
          id: 1,
          name: 'Maths',
          quizzes: [{
            id: 1,
            name: 'Countries In continents',
            qna: [{
              answers: [0, 1], id: 1, options: ['Argentina', 'usa', 'italy', 'Rusia'], question: '2 countries in america',
            }, {
              answers: [2, 3], id: 2, options: ['Chile', 'Nigeria', 'China', 'Japan'], question: '2 countries in Asia',
            }, {
              answers: [0, 2], id: 3, options: ['Camerun', 'Brasil', 'China', 'Nigeria'], question: '2 countries in Africa',
            }],
          }],
          students: [{
            grade: 0,
            id: 1,
            quizzes: [{
              baseQualification: 100, id: 1, name: 'Countries In continents', qna: [{ id: 1, rightAnswers: [0, 1], studentAnswer: [] }, { id: 2, rightAnswers: [2, 3], studentAnswer: [] }, { id: 3, rightAnswers: [0, 2], studentAnswer: [] }], qualification: 0,
            }],
          }, {
            grade: 66.66,
            id: 2,
            quizzes: [{
              baseQualification: 100, id: 1, name: 'Countries In continents', qna: [{ id: 1, rightAnswers: [0, 1], studentAnswer: [] }, { id: 2, rightAnswers: [2, 3], studentAnswer: [2, 3] }, { id: 3, rightAnswers: [0, 2], studentAnswer: [0, 2] }], qualification: 66.66,
            }],
          }, {
            grade: 0,
            id: 3,
            quizzes: [{
              baseQualification: 100, id: 1, name: 'Countries In continents', qna: [{ id: 1, rightAnswers: [0, 1], studentAnswer: [] }, { id: 2, rightAnswers: [2, 3], studentAnswer: [] }, { id: 3, rightAnswers: [0, 2], studentAnswer: [] }], qualification: 0,
            }],
          }],
          teacherId: 1,
        },
      ];
      students[1].submitAnswer(classes, 1, 1, 3, [0, 2]);
      students[1].submitAnswer(classes, 1, 1, 2, [2, 3]);
      expect(classes).toEqual(expected);
    });
  });
});
