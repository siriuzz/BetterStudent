class User {
    constructor(name, email, phone_number) {
        this.name = name;
        this.email = email;
        this.phone_number = phone_number;
    }
}

class Student extends User {
    constructor(name, email, phone_number, info = "Inserta tu información", rating = 0.0, career_id = 1) {
        super(name, email, phone_number);
        this.info = info;
        this.rating = rating;
        this.career_id = career_id;
    }

    toObject() {
        return {
            name: this.name,
            email: this.email,
            phone_number: this.phone_number,
            info: this.info,
            rating: this.rating,
            career_id: this.career_id,
        };
    }
}

class Admin extends User {
    constructor(name, email, phone_number) {
        super(name, email, phone_number);
    }

    toObject() {
        return {
            name: this.name,
            email: this.email,
            phone_number: this.phone_number,
        };
    }
}

class Career {
    constructor(name, faculty) {
        this.name = name;
        this.faculty = faculty;
    }

    toObject() {
        return {
            name: this.name,
            faculty: this.faculty,
        };
    }
}

class Review {
    constructor(student_id, title, comment, rating, date = new Date()) {
        this.student_id = student_id;
        this.title = title;
        this.comment = comment;
        this.date = date;
        this.rating = rating;
    }

    toObject() {
        return {
            student_id: this.student_id,
            title: this.title,
            comment: this.comment,
            date: this.date,
            rating: this.rating,
        };
    }

}

class Section {
    constructor(subject_id, classroom_code, professor_id, number) {
        this.subject_id = subject_id;
        this.classroom_code = classroom_code;
        this.professor_id = professor_id;
        this.number = number;
    }

    toObject() {
        return {
            subject_id: this.subject_id,
            classroom_code: this.classroom_code,
            professor_id: this.professor_id,
            number: this.number,
        };
    }
}

class Friend {
    constructor(student_id, friend_id) {
        this.student_id = student_id;
        this.friend_id = friend_id;
    }

    toObject() {
        return {
            student_id: this.student_id,
            friend_id: this.friend_id,
        };
    }
}

class Subject {
    constructor(name) {
        this.name = name;
    }
    toObject() {
        return {
            name: this.name,
        };
    }
}

class Professor {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    toObject() {
        return {
            name: this.name,
            email: this.email
        };
    }
}

module.exports = { Student, Admin, Career, Review, Section, Friend, Subject, Professor };