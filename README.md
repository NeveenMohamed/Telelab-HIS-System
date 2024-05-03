# Telelab System

Welcome to the Telelab project! This system facilitates the management of appointments and lab test results across multiple regional labs connected to a central lab server. It provides a seamless experience for patients, doctors, and receptionists.

## Overview

Telelab consists of two main components:
- **Central Lab (Server):** Handles appointment bookings and receives lab test results from regional labs.
- **Regional Labs (Clients):** Receive appointment notifications, record lab test results, and communicate with the central lab.

## Features

- **Appointment Booking:** Patients can call the central lab to schedule appointments.
- **HL7 Messaging:** The central lab sends HL7 messages to specific regional labs to notify them of appointments.
- **Lab Test Reporting:** Doctors at regional labs can input lab test results into the system, sending them back to the central lab for storage.
- **User Authentication:** Each system (central lab and regional labs) has its own authentication and login mechanism. Regional labs have two user types: doctors and receptionists.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Messaging Protocol:** TCP for communication between central and regional labs
- **Data Interchange Standard:** HL7 for message exchange

## Screenshots

![Screenshot 1](https://github.com/NeveenMohamed/HIS-System/assets/93449171/56d9654a-3b21-44ac-8fb0-99f39e9d10af)
*Login page.*

![Screenshot (1197)](https://github.com/NeveenMohamed/HIS-System/assets/93449171/43a3ba4b-be5a-4bd7-a0dc-db7be58b39fb)
*The booked appointments in the central lab and its information*

![Screenshot (1198)](https://github.com/NeveenMohamed/HIS-System/assets/93449171/fde42f14-589f-4fbf-971c-560cbaf6c140)
*Reservation form to book an appointment from the central lab*

![Screenshot (1199)](https://github.com/NeveenMohamed/HIS-System/assets/93449171/db27bb04-5149-444a-bddd-4a6f86194d62)
*The result report of a patient and the lab test results*


## Setup Instructions

1. Clone the repository to your local machine.
2. Install the required dependencies for both frontend and backend.
3. Set up the MongoDB database.
4. Configure authentication mechanisms for each system.
5. Run the central lab server and regional lab clients.
6. Ensure TCP connections are established between the central lab and regional labs.
7. Start booking appointments and recording lab test results!

## Contributing

### Contributors

- Dina Hussam ([@Dinahussam](https://github.com/Dinahussam))
- Neveen Mohammed ([@NeveenMohammed](https://github.com/NeveenMohamed))
- Omar Ahmed Anwar ([@omaranwar21](https://github.com/omaranwar21))
- Omar Saad ([@Omar-Saad-ELGharbawy](https://github.com/Omar-Saad-ELGharbawy))
- Sherif Ahmed ([@Sherif-2001](https://github.com/Sherif-2001))
- Youseif Essam ([@jooo71](https://github.com/jooo71))

Contributions to Telelab are welcome! Whether you want to fix bugs, add features, or improve documentation, feel free to submit pull requests.


# Thank you for using Telelab! We hope it streamlines your lab management processes effectively.
