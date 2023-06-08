import React from "react";

function Faq() {
  return (
    <div>
      <ul className="py-5 divide-y">
        <li className="py-2">
          <div className="text-lg font-semibold font-serif">
            What is a budget management expense tracking web app?{" "}
          </div>
          <div>
            A budget management expense tracking web app is an online
            application that helps you manage your finances by tracking and
            categorizing your expenses. It allows you to create a budget, record
            your transactions, analyze spending patterns, and make informed
            financial decisions.
          </div>
        </li>
        <li className="py-2">
          <div className="text-lg font-semibold font-serif">
            How can a budget management expense tracking web app benefit me?
          </div>
          <div>
            Using a budget management expense tracking web app provides several
            benefits. It helps you gain a clear understanding of your spending
            habits, allows you to set financial goals, assists in tracking your
            progress, and enables you to make adjustments to your budget as
            needed. It also provides insights and reports that help you identify
            areas where you can save money and optimize your spending.
          </div>
        </li>
        <li className="py-2">
          <div className="text-lg font-semibold font-serif">
            How do I get started with the budget management expense tracking web
            app?{" "}
          </div>
          <div>
            To get started, you can sign up for an account on the web app. Once
            you're logged in, you can create your budget, set up expense
            categories or envelopes, and start recording your transactions. The
            web app will guide you through the process, making it easy to begin
            managing your finances.
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Faq;
