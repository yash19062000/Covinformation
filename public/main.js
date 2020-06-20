const form = document.getElementById('q1');

//SUbmission of the form
form.addEventListener('submit', (e) => {


    const choice = document.querySelector('input[name=os]:checked').value;
    const choice1 = document.querySelector('input[name=os1]:checked').value;
    const choice2 = document.querySelector('input[name=os2]:checked').value;
    const choice3 = document.querySelector('input[name=os3]:checked').value;
    const choice4 = document.querySelector('input[name=os4]:checked').value;
    const choice5 = document.querySelector('input[name=os5]:checked').value;
    const choice6 = document.querySelector('input[name=os6]:checked').value;

    const data = { os: choice, os1: choice1, os2: choice2, os3: choice3, os4: choice4, os5: choice5, os6: choice6 }
    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(respond => respond.json()).then(data => console.log(data)).catch(error => console.log(error));

    // fetch('http://localhost:3000/poll', {
    //     method: 'post',
    //     body: JSON.stringify(data1),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // }).then(respond => respond.json()).then(data1 => console.log(data1)).catch(error => console.log(error));

    // fetch('http://localhost:3000/poll', {
    //     method: 'post',
    //     body: JSON.stringify(data2),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // }).then(respond => respond.json()).then(data2 => console.log(data2)).catch(error => console.log(error));

    // fetch('http://localhost:3000/poll', {
    //     method: 'post',
    //     body: JSON.stringify(data3),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // }).then(respond => respond.json()).then(data3 => console.log(data3)).catch(error => console.log(error));

    // fetch('http://localhost:3000/poll', {
    //     method: 'post',
    //     body: JSON.stringify(data4),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // }).then(respond => respond.json()).then(data4 => console.log(data4)).catch(error => console.log(error));

    // fetch('http://localhost:3000/poll', {
    //     method: 'post',
    //     body: JSON.stringify(data5),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // }).then(respond => respond.json()).then(data5 => console.log(data5)).catch(error => console.log(error));

    // fetch('http://localhost:3000/poll', {
    //     method: 'post',
    //     body: JSON.stringify(data6),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // }).then(respond => respond.json()).then(data6 => console.log(data6)).catch(error => console.log(error));

    e.preventDefault();
});

fetch('http://localhost:3000/poll').then(respond => respond.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length;
        //console.log(votes);
        //counting votes
        const voteCounts = votes.reduce((acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0) + 1), acc), {});
        console.log(voteCounts);
        let dataPoints = [
            { label: 'Male', y: voteCounts.Male },
            { label: 'Female', y: voteCounts.Female },
            { label: 'Other', y: voteCounts.Other }
        ];


        const chartContainer = document.querySelector('#chartContainer');

        if (chartContainer) {
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: 'Q1. What is your Gender?'
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();

            Pusher.logToConsole = true;

            var pusher = new Pusher('e1f18e97ce7218d0fba1', {
                cluster: 'ap2',
                encrypted: true
            });

            var channel = pusher.subscribe('a');
            channel.bind('b', function (data) {

                dataPoints = dataPoints.map(x => {
                    console.log(x.label);
                    console.log(data.os);
                    if (x.label == data.os) {
                        x.y += 1;
                        return x;
                    } else {
                        return x;
                    }
                });
                chart.render();
            });


        }

    });

fetch('http://localhost:3000/poll').then(respond => respond.json())
    .then(data1 => {
        const votes1 = data1.votes;
        const totalVotes1 = votes1.length;
        //counting votes
        const voteCounts1 = votes1.reduce((acc1, vote1) => ((acc1[vote1.os1] = (acc1[vote1.os1] || 0) + 1), acc1), {});
        console.log(voteCounts1);
        console.log(votes1);
        console.log(totalVotes1);
        let dataPoints1 = [
            { label: '24 and below', y: voteCounts1.a },
            { label: '25-49', y: voteCounts1.b },
            { label: '49 and above', y: voteCounts1.c }
        ];


        const chartContainer1 = document.querySelector('#chartContainer1');

        if (chartContainer1) {
            const chart1 = new CanvasJS.Chart('chartContainer1', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: 'Q2. What is your Age range?'
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints1
                    }
                ]
            });
            chart1.render();

            Pusher.logToConsole = true;

            var pusher1 = new Pusher('e1f18e97ce7218d0fba1', {
                cluster: 'ap2',
                encrypted: true
            });

            var channel1 = pusher1.subscribe('a');
            channel1.bind('b', function (data1) {

                dataPoints1 = dataPoints1.map(x => {
                    console.log(x);
                    console.log(data1.os1);
                    if ("a" == data1.os1) {
                        if (x.label == "24 and below")
                            x.y += 1;
                        return x;
                    } if ("b" == data1.os1) {
                        if (x.label == "25-49")
                            x.y += 1;
                        return x;
                    } if ("c" == data1.os1) {
                        if (x.label == "49 and above")
                            x.y += 1;
                        return x;
                    }
                    else {
                        return x;
                    }
                });
                chart1.render();
            });


        }

    });


fetch('http://localhost:3000/poll').then(respond => respond.json())
    .then(data2 => {
        const votes2 = data2.votes;
        const totalVotes2 = votes2.length;
        //counting votes
        const voteCounts2 = votes2.reduce((acc2, vote2) => ((acc2[vote2.os2] = (acc2[vote2.os2] || 0) + 1), acc2), {});
        console.log(voteCounts2);
        console.log(votes2);
        console.log(totalVotes2);
        let dataPoints2 = [
            { label: 'Yes', y: voteCounts2.Yes },
            { label: 'No', y: voteCounts2.No }
        ];


        const chartContainer2 = document.querySelector('#chartContainer2');

        if (chartContainer2) {
            const chart2 = new CanvasJS.Chart('chartContainer2', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: 'Q3. Did you come into close contact (within 6 feet) with someone who has a laboratory confirmed COVID – 19 diagnosis in the past 14 days ?'
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints2
                    }
                ]
            });
            chart2.render();

            Pusher.logToConsole = true;

            var pusher2 = new Pusher('e1f18e97ce7218d0fba1', {
                cluster: 'ap2',
                encrypted: true
            });

            var channel2 = pusher2.subscribe('a');
            channel2.bind('b', function (data2) {

                dataPoints2 = dataPoints2.map(x => {
                    console.log(x);
                    console.log(data2.os2);
                    if (x.label == data2.os2) {
                        x.y += 1;
                        return x;
                    }
                    else {
                        return x;
                    }
                });
                chart2.render();
            });


        }

    });


fetch('http://localhost:3000/poll').then(respond => respond.json())
    .then(data3 => {
        const votes3 = data3.votes;
        const totalVotes3 = votes3.length;
        //counting votes
        const voteCounts3 = votes3.reduce((acc3, vote3) => ((acc3[vote3.os3] = (acc3[vote3.os3] || 0) + 1), acc3), {});
        console.log(voteCounts3);
        console.log(votes3);
        console.log(totalVotes3);
        let dataPoints3 = [
            { label: 'Yes', y: voteCounts3.Yes },
            { label: 'No', y: voteCounts3.No }
        ];


        const chartContainer3 = document.querySelector('#chartContainer3');

        if (chartContainer3) {
            const chart3 = new CanvasJS.Chart('chartContainer3', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: 'Q4. Have you experienced any of the following symptoms in the past 7 days, or not? Symptoms: Fever, Chills, Runny or stuffy nose, Chest congestion, Skin rash, Cough, Sore throat, Sneezing, Muscle or body aches, Headaches, Fatigue or tiredness, Shortness of breath, Abdominal discomfort, Nausea or vomiting, Diarrhea, Changed or lost sense of taste or smell, Loss of appetite',
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints3
                    }
                ]
            });
            chart3.render();

            Pusher.logToConsole = true;

            var pusher3 = new Pusher('e1f18e97ce7218d0fba1', {
                cluster: 'ap2',
                encrypted: true
            });

            var channel3 = pusher3.subscribe('a');
            channel3.bind('b', function (data3) {

                dataPoints3 = dataPoints3.map(x => {
                    console.log(x);
                    console.log(data3.os3);
                    if (x.label == data3.os3) {
                        x.y += 1;
                        return x;
                    }
                    else {
                        return x;
                    }
                });
                chart3.render();
            });


        }

    });


fetch('http://localhost:3000/poll').then(respond => respond.json())
    .then(data4 => {
        const votes4 = data4.votes;
        const totalVotes4 = votes4.length;
        //counting votes
        const voteCounts4 = votes4.reduce((acc4, vote4) => ((acc4[vote4.os4] = (acc4[vote4.os4] || 0) + 1), acc4), {});
        console.log(voteCounts4);
        console.log(votes4);
        console.log(totalVotes4);
        let dataPoints4 = [
            { label: 'Excellent', y: voteCounts4.A },
            { label: 'Very Good', y: voteCounts4.B },
            { label: 'Good', y: voteCounts4.C },
            { label: 'Fair', y: voteCounts4.D },
            { label: 'Poor', y: voteCounts4.E }
        ];


        const chartContainer4 = document.querySelector('#chartContainer4');

        if (chartContainer4) {
            const chart4 = new CanvasJS.Chart('chartContainer4', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: 'Q5. Would you say your health in general is excellent, very good, good, fair, or poor?'
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints4
                    }
                ]
            });
            chart4.render();

            Pusher.logToConsole = true;

            var pusher4 = new Pusher('e1f18e97ce7218d0fba1', {
                cluster: 'ap2',
                encrypted: true
            });

            var channel4 = pusher4.subscribe('a');
            channel4.bind('b', function (data4) {

                dataPoints4 = dataPoints4.map(x => {
                    console.log(x);
                    console.log(data4.os4);
                    if ("A" == data4.os4) {
                        if (x.label == "Excellent")
                            x.y += 1;
                        return x;
                    }
                    if ("B" == data4.os4) {
                        if (x.label == "Very Good")
                            x.y += 1;
                        return x;
                    }
                    if ("C" == data4.os4) {
                        if (x.label == "Good")
                            x.y += 1;
                        return x;
                    }
                    if ("D" == data4.os4) {
                        if (x.label == "Fair")
                            x.y += 1;
                        return x;
                    }
                    if ("E" == data4.os4) {
                        if (x.label == "Poor")
                            x.y += 1;
                        return x;
                    }
                    else {
                        return x;
                    }
                });
                chart4.render();
            });


        }

    });


fetch('http://localhost:3000/poll').then(respond => respond.json())
    .then(data5 => {
        const votes5 = data5.votes;
        const totalVotes5 = votes5.length;
        //counting votes
        const voteCounts5 = votes5.reduce((acc5, vote5) => ((acc5[vote5.os5] = (acc5[vote5.os5] || 0) + 1), acc5), {});
        console.log(voteCounts5);
        console.log(votes5);
        console.log(totalVotes5);
        let dataPoints5 = [
            { label: 'Asia', y: voteCounts5.A },
            { label: 'Australia', y: voteCounts5.B },
            { label: 'Africa', y: voteCounts5.C },
            { label: 'Europe', y: voteCounts5.D },
            { label: 'North America', y: voteCounts5.E },
            { label: 'South America', y: voteCounts5.F }
        ];


        const chartContainer5 = document.querySelector('#chartContainer5');

        if (chartContainer5) {
            const chart5 = new CanvasJS.Chart('chartContainer5', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: 'Q6. Which coontinent do you live in?'
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints5
                    }
                ]
            });
            chart5.render();

            Pusher.logToConsole = true;

            var pusher5 = new Pusher('e1f18e97ce7218d0fba1', {
                cluster: 'ap2',
                encrypted: true
            });

            var channel5 = pusher5.subscribe('a');
            channel5.bind('b', function (data5) {

                dataPoints5 = dataPoints5.map(x => {
                    console.log(x);
                    console.log(data5.os5);
                    if ("A" == data5.os5) {
                        if (x.label == "Asia")
                            x.y += 1;
                        return x;
                    }
                    if ("C" == data5.os5) {
                        if (x.label == "Africa")
                            x.y += 1;
                        return x;
                    }
                    if ("B" == data5.os5) {
                        if (x.label == "Australia")
                            x.y += 1;
                        return x;
                    }
                    if ("D" == data5.os5) {
                        if (x.label == "Europe")
                            x.y += 1;
                        return x;
                    }
                    if ("E" == data5.os5) {
                        if (x.label == "North America")
                            x.y += 1;
                        return x;
                    }
                    if ("F" == data5.os5) {
                        if (x.label == "South America")
                            x.y += 1;
                        return x;
                    }
                    else {
                        return x;
                    }
                });
                chart5.render();
            });


        }

    });





fetch('http://localhost:3000/poll').then(respond => respond.json())
    .then(data6 => {
        const votes6 = data6.votes;
        const totalVotes6 = votes6.length;
        //counting votes
        const voteCounts6 = votes6.reduce((acc6, vote6) => ((acc6[vote6.os6] = (acc6[vote6.os6] || 0) + 1), acc6), {});
        console.log(voteCounts6);
        console.log(votes6);
        console.log(totalVotes6);
        let dataPoints6 = [
            { label: '$20,000 or below', y: voteCounts6.A },
            { label: '$20,000-$50,000', y: voteCounts6.B },
            { label: '$50,000-$100,000', y: voteCounts6.C },
            { label: '$100,000 or more', y: voteCounts6.D },
            { label: 'Dont know', y: voteCounts6.E }
        ];


        const chartContainer6 = document.querySelector('#chartContainer6');

        if (chartContainer6) {
            const chart6 = new CanvasJS.Chart('chartContainer6', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: 'Q7. What is your total individual income?'
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints6
                    }
                ]
            });
            chart6.render();

            Pusher.logToConsole = true;

            var pusher6 = new Pusher('e1f18e97ce7218d0fba1', {
                cluster: 'ap2',
                encrypted: true
            });

            var channel6 = pusher6.subscribe('a');
            channel6.bind('b', function (data6) {

                dataPoints6 = dataPoints6.map(x => {
                    console.log(x);
                    console.log(data6.os6);
                    if ("A" == data6.os6) {
                        if (x.label == "$20,000 or below")
                            x.y += 1;
                        return x;
                    }
                    if ("B" == data6.os6) {
                        if (x.label == "$20,000-$50,000")
                            x.y += 1;
                        return x;
                    }
                    if ("C" == data6.os6) {
                        if (x.label == "$50,000-$100,000")
                            x.y += 1;
                        return x;
                    }
                    if ("D" == data6.os6) {
                        if (x.label == "$100,000 or more")
                            x.y += 1;
                        return x;
                    }
                    if ("E" == data6.os6) {
                        if (x.label == "Dont know")
                            x.y += 1;
                        return x;
                    }
                    else {
                        return x;
                    }
                });
                chart6.render();
            });


        }

    });
