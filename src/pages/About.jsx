import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="text-center font-semibold text-green-500">About</div>
        <p className="mb-3">
          Welcome to our budget management web application! Our platform, built
          with React.js, Tailwind CSS, and Firebase database, is designed to
          simplify the process of managing your expenses and creating envelopes.
          With our intuitive interface, you can easily track your spending,
          modify envelopes as needed, and generate insightful reports using
          interactive charts and graphs.
        </p>
        <h2 className="text-xl font-semibold my-3">
          Expense Tracking Made Easy
        </h2>
        <p className="mb-3">
          Our application allows you to effortlessly record and categorize your
          expenses. Whether you're paying with cash, credit cards, or digital
          wallets, you can easily log your transactions and keep a clear
          overview of your spending habits.
        </p>
        <h2 className="text-xl font-semibold my-3">
          Envelope Creation and Modification
        </h2>
        <p className="mb-3">
          Take control of your budget by creating envelopes for different
          expense categories. Assign specific amounts of money to each envelope
          to allocate your funds effectively. Need to make adjustments? Our
          application allows you to modify envelopes easily, ensuring your
          budget remains adaptable to changes in your financial situation.
        </p>
        <h2 className="text-xl font-semibold my-3">Visualize Your Finances</h2>
        <p className="mb-3">
          Gain valuable insights into your financial health with our
          comprehensive reports. Our application generates interactive charts
          and graphs, presenting your spending patterns and savings progress in
          a visually appealing format. Use this information to make informed
          decisions and optimize your budget.
        </p>
        <h2 className="text-xl font-semibold my-3">Seamless User Experience</h2>
        <p className="mb-3">
          We've prioritized a user-friendly interface, making navigation and
          functionality a breeze. With our application's intuitive design, even
          beginners can manage their expenses and envelopes effortlessly.
        </p>
        <h2 className="text-xl font-semibold my-3">Secure and Private</h2>
        <p className="mb-3">
          We understand the importance of safeguarding your sensitive financial
          information. Our application utilizes Firebase database, which
          implements robust security measures to protect your data. Rest assured
          that your personal and financial details are kept confidential.
        </p>
        <p className="mb-3">
          Start your journey toward better budget management with our web
          application. Take control of your expenses, create envelopes, and
          visualize your progress with ease. Experience the power of React.js,
          Tailwind CSS, and Firebase database in simplifying your financial
          management.
        </p>

        <div className="p-5 border mt-5 flex flex-col text-center">
          <span>Created By</span>
          <Link to="">Mrical Singhal</Link>
          <Link>Bharat Soni</Link>
          <Link>Kanishk Gupta</Link>
        </div>
      </div>
    </div>
  );
}

export default About;
