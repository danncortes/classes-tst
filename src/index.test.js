import {
  Teacher, Student, Classes, Qna,
} from './index';

describe('Test School Models', () => {
  let teachers = [];
  let students = [];
  let classes = [];

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

  classes = [
    new Classes(1, 'Maths', 1, [1, 2, 3]),
    new Classes(1, 'workout', 2, [3, 4, 5]),
    new Classes(1, 'Physic', 3, [4, 5, 6]),
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
    const expected = [
      {
        id: 1, name: 'Maths', teacher: 1, students: [1, 2, 3],
      },
      {
        id: 1, name: 'workout', teacher: 2, students: [3, 4, 5],
      },
      {
        id: 1, name: 'Physic', teacher: 3, students: [4, 5, 6],
      },
    ];
    expect(classes).toEqual(expected);
  });

  describe('Testing quizzes', () => {
    const quizzes = [];

    const qnaQuiz1 = [
      new Qna('2 countries in america', ['Argentina', 'usa', 'italy', 'Rusia'], [0, 1]),
      new Qna('2 countries in Asia', ['Chile', 'Nigeria', 'China', 'Japan'], [2, 3]),
      new Qna('2 countries in Africa', ['Camerun', 'Brasil', 'China', 'Nigeria'], [0, 2]),
    ];

    teachers[0].createQuiz(1, quizzes, 'Countries In continents', qnaQuiz1);

    it('Should create quizzes', () => {
      const expected = [
        {
          id: 1,
          name: 'Countries In continents',
          teacher: { id: 1, name: 'X professor' },
          qna: [
            {
              question: '2 countries in america',
              options: ['Argentina', 'usa', 'italy', 'Rusia'],
              answers: [0, 1],
            }, {
              question: '2 countries in Asia',
              options: ['Chile', 'Nigeria', 'China', 'Japan'],
              answers: [2, 3],
            }, {
              question: '2 countries in Africa',
              options: ['Camerun', 'Brasil', 'China', 'Nigeria'],
              answers: [0, 2],
            },
          ],
        },
      ];
      expect(quizzes).toEqual(expected);
    });
  });
});
