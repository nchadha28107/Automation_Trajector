Feature: Medical Evaluation Form Submission

  @smoke
  Scenario: Submit the medical evaluation form
    Given user navigate to the Trajector Medical Home Page
    When user click on Get Started Button
    Then user land on Medical Evaluation Page
    When user fills the Medical Evaluation Form
    Then user submits the form
