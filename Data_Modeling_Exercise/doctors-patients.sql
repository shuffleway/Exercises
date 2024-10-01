DROP DATABASE IF EXISTS doctors_patient;

CREATE DATABASE doctors_patient;

\c doctors_patient

CREATE TABLE doctors
(
  doctor_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  contact_info TEXT
);

CREATE TABLE patients
(
  patient_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  dob DATE NOT NULL,
  contact_info TEXT,
  address TEXT
);

CREATE TABLE visits
(
  visit_id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES doctors(doctor_id),
  patient_id INTEGER REFERENCES patients(patient_id),
  visit_date DATE NOT NULL,
  notes TEXT
);

CREATE TABLE diseases
(
  disease_id SERIAL PRIMARY KEY,
  disease_name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE diagnoses
(
  diagnosis_id SERIAL PRIMARY KEY,
  visit_id INTEGER REFERENCES visits(visit_id),
  disease_id INTEGER REFERENCES diseases(disease_id),
  diagnosis_date DATE NOT NULL
);

INSERT INTO doctors (first_name, last_name, specialization, contact_info)
VALUES 
('John', 'Doe', 'Cardiologist', 'john.doe@example.com'),
('Jane', 'Smith', 'Dermatologist', 'jane.smith@example.com'),
('Emily', 'Brown', 'Neurologist', 'emily.brown@example.com');

INSERT INTO patients (first_name, last_name, dob, contact_info, address)
VALUES 
('Michael', 'Johnson', '1980-03-15', 'michael.johnson@example.com', '123 Main St, Springfield'),
('Sarah', 'Miller', '1995-07-20', 'sarah.miller@example.com', '456 Elm St, Springfield'),
('David', 'Wilson', '1972-11-09', 'david.wilson@example.com', '789 Oak St, Springfield');

INSERT INTO visits (doctor_id, patient_id, visit_date, notes)
VALUES 
(1, 1, '2024-09-28', 'Routine check-up'),
(2, 2, '2024-09-29', 'Skin rash examination'),
(3, 3, '2024-09-30', 'Headache and dizziness assessment');

INSERT INTO diseases (disease_name, description)
VALUES 
('Hypertension', 'High blood pressure'),
('Eczema', 'Chronic skin condition causing itchy inflammation'),
('Migraine', 'Recurrent headaches, often in association with other symptoms');

INSERT INTO diagnoses (visit_id, disease_id, diagnosis_date)
VALUES 
(1, 1, '2024-09-28'),  -- Patient 1 diagnosed with Hypertension
(2, 2, '2024-09-29'),  -- Patient 2 diagnosed with Eczema
(3, 3, '2024-09-30');  -- Patient 3 diagnosed with Migraine

