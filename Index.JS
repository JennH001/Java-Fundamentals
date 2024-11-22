const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15", 
        points_possible: 500
      }
    ]
  };
  
  
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {
    const result = [];
  
    
    const dueAssignments = ag.assignments.filter(assignment => new Date(assignment.due_at) <= new Date());
  
    
    const submissionsByLearner = submissions.reduce((acc, submission) => {
      if (!acc[submission.learner_id]) acc[submission.learner_id] = [];
      acc[submission.learner_id].push(submission);
      return acc;
    }, {});
  
    
    for (const learnerId in submissionsByLearner) {
      const learnerSubmissions = submissionsByLearner[learnerId];
  
      let weightedScore = 0;
      let totalWeight = 0;
      const performance = {};
  
      
      dueAssignments.forEach(assignment => {
        const submission = learnerSubmissions.find(sub => sub.assignment_id === assignment.id);
        let score = 0;
        if (submission) {
          
          score = submission.submission.submitted_at > assignment.due_at ? submission.submission.score - 15 : submission.submission.score;
        }
        
       
        performance[assignment.id] = score / assignment.points_possible;
  
       
        weightedScore += (score / assignment.points_possible) * assignment.points_possible;
        totalWeight += assignment.points_possible;
      });
  
      
      const avg = totalWeight > 0 ? weightedScore / totalWeight : 0;
  
      
      result.push({
        id: parseInt(learnerId), 
        avg: avg,
        ...performance
      });
    }
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  