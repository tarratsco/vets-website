import React from 'react';

/**
 * Renders contextual clinical term definitions above the Part III-A scenario list.
 * These expand-on-demand entries help Veterans understand medical terminology
 * without leaving the current page.
 */
export default function ClinicalTermDefinitions() {
  return (
    <div className="vads-u-margin-bottom--4">
      <va-alert status="info" visible class="vads-u-margin-bottom--3">
        <p slot="headline">
          You may answer some, all, or none of these questions
        </p>
        <p>
          Your answers will not be judged. They help guide the people who will
          make health care decisions for you. Not answering any scenario is a
          valid choice. You can always update your advance directive later.
        </p>
      </va-alert>

      <h3 className="vads-u-font-size--h4">
        Definitions of medical terms used below
      </h3>

      <va-additional-info trigger="What is CPR (cardiopulmonary resuscitation)?">
        <p>
          CPR is an emergency procedure used when the heart stops beating or
          breathing stops. It includes chest compressions and may involve
          electric shocks to restart the heart (defibrillation) and a breathing
          tube placed down the throat. CPR may be continued indefinitely if
          requested.
        </p>
      </va-additional-info>

      <va-additional-info trigger="What is a breathing machine (mechanical ventilation)?">
        <p>
          A mechanical ventilator is a machine that breathes for you when you
          cannot breathe on your own. A tube is placed down your throat into
          your lungs. This machine may be used temporarily or for an extended
          period of time.
        </p>
      </va-additional-info>

      <va-additional-info trigger="What is kidney dialysis?">
        <p>
          Dialysis is a treatment that filters waste and extra fluid from your
          blood when your kidneys can no longer do this on their own. It can be
          done at a dialysis center several times per week or at home.
        </p>
      </va-additional-info>

      <va-additional-info trigger="What is a feeding tube (artificial nutrition and hydration)?">
        <p>
          A feeding tube delivers liquid nutrition directly to your stomach or
          small intestine through a tube inserted through your nose, mouth, or
          surgically through your abdomen. IV fluids can deliver hydration
          directly into your veins.
        </p>
      </va-additional-info>

      <va-additional-info trigger="What does 'vegetative state' mean?">
        <p>
          A vegetative state is when a person is alive but shows no signs of
          being aware of their surroundings or themselves. They may have sleep
          and wake cycles and reflexive responses, but they cannot think, feel,
          or respond purposefully. A "persistent" or "permanent" vegetative
          state means this condition has lasted a long time with little chance
          of recovery.
        </p>
      </va-additional-info>
    </div>
  );
}