'use strict';

$(function () {
  $('.search-fail').css({
    "display": "none"

  })

  $('#submit').on('click', function (e) {
    e.preventDefault();
    $('.result').remove();
    $('.total-result').remove();
    var parameters = {
      token: 'c5b59694-fe2d-44c9-9c2d-38c94b0f5ebe',
      format: 'json',
      language: 'english',
      q: $("#search").val()
    };

    $.getJSON("https://webhose.io/search", parameters)
      .done(function (data, textStatus, jqXHR) {

        // read more about parameters at https://webhose.io/documentation

        // here we analyze data and add search results to the page
        console.log(data);

        //        AddNavigationLinks(data);
        $('#results').css({
          "display": "block"
        }).html(createResult());


        function createResult() {
          $('#results').append('<p class="total-result">' + 'Результатов: примерно ' + data.totalResults + '</p>');
          for (var i = 1; i < data.posts.length; i++) {
            $('#results').append('<div class="result">' + '</div>');
            $('.result').append('<a>' + data.posts[i].title + '</a>');
            $('.result a').addClass('link');
            $('.result a').attr('href', data.posts[i].url);
            $('.result').append('<p class= "result-link">' + data.posts[i].url + '</p>');
            $('.result').append('<p class= "result-text">' + data.posts[i].text.slice(0, 200) + '...' + '</p>');

          }
        }

        if (data.totalResults == 0) {
          $('.search-fail').css({
            "display": "block"
          });
        }


        //      pagination


        if (data.totalResults > 10) {
          $('#results').append('<div class="pagination">' + '</div>');
        }

        //    end  pagination
      })
      .fail(function (jqXHR, textStatus, errorThrown) {


        console.log(errorThrown.toString());
      });
  })
});

//прототипы

$(function () {
  function Human(name, age, sex, growth, weight) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.growth = growth;
    this.weight = weight;

  }

  function Worker(placeOfWork, salary, job) {
    this.placeOfWork = placeOfWork;
    this.salary = salary;
    this.work = function () {
      var myJob = 'I am work at ' + this.placeOfWork;
      console.log(myJob);
      return myJob;
    }
  }

  function Student(placeOfStudy, grants, serials) {
  this.placeOfStudy = placeOfStudy;
  this.grants = grants;
  this.serials = serials;
  this.watch = function () {
    console.log('I am watch at ' + this.serials);
    return;
  };
}
  Worker.prototype = new Human();
  Student.prototype = new Human();

  var bill = new Student();
  bill.name = 'Billy';
  bill.age = 30;
  bill.sex = 'man';
  bill.placeOfStudy = 'Yale';
  bill.grants = '1000 usd';
  bill.serials = 'Suits';
  bill.watch();
  console.log(bill);

  var john = new Worker();
  john.name = 'Jonny';
  john.age = 20;
  john.sex = 'man';
  john.placeOfWork = 'police';
  john.salary = '1550 usd';
  john.work();
  console.log(john);


});