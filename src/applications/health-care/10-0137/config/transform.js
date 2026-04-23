import { v4 as uuidv4 } from 'uuid';

/**
 * Transforms the Redux formData into the API payload shape
 * expected by POST /v0/health/advance_directive
 */
export function transformForSubmit(formConfig, form) {
  const { data } = form;

  const partI = {
    veteran_full_name: {
      last: data.veteranFullName?.last || '',
      first: data.veteranFullName?.first || '',
      middle: data.veteranFullName?.middle || null,
    },
    date_of_birth: data.veteranDateOfBirth || '',
    address: {
      street: data.veteranAddress?.street || '',
      city: data.veteranAddress?.city || '',
      state: data.veteranAddress?.state || '',
      zip_code: data.veteranAddress?.zipCode || '',
    },
    home_phone: data.veteranHomePhone || null,
    work_phone: data.veteranWorkPhone || null,
    mobile_phone: data.veteranMobilePhone || null,
  };

  const buildAgentPayload = agent => {
    if (!agent) return null;
    return {
      full_name: {
        last: agent.fullName?.last || '',
        first: agent.fullName?.first || '',
        middle: agent.fullName?.middle || null,
      },
      relationship: agent.relationship || '',
      address: {
        street: agent.address?.street || '',
        city: agent.address?.city || '',
        state: agent.address?.state || '',
        zip_code: agent.address?.zipCode || '',
      },
      home_phone: agent.homePhone || null,
      work_phone: agent.workPhone || null,
      mobile_phone: agent.mobilePhone || null,
    };
  };

  const partII = {
    appoint_health_care_agent: data.appointHealthCareAgent || 'decline',
    primary_agent:
      data.appointHealthCareAgent === 'appoint'
        ? buildAgentPayload(data.primaryAgent)
        : null,
    appoint_alternate_agent: data.appointAlternateAgent || null,
    alternate_agent:
      data.appointAlternateAgent === 'appoint_alternate'
        ? buildAgentPayload(data.alternateAgent)
        : null,
  };

  const partIII = {
    section_a: {
      scenario_unconscious: data.scenarioUnconscious || null,
      scenario_brain_damage: data.scenarioBrainDamage || null,
      scenario_permanent_dependence: data.scenarioPermanentDependence || null,
      scenario_breathing_machine: data.scenarioBreathingMachine || null,
      scenario_unrelievable_pain: data.scenarioUnrelievablePain || null,
      scenario_imminent_death: data.scenarioImminentDeath || null,
      scenario_other: data.scenarioOther || null,
      scenario_other_description: data.scenarioOtherDescription || null,
    },
    section_b_mental_health_preferences: data.mentalHealthPreferences || null,
    section_c_additional_preferences: data.additionalPreferences || null,
    section_d_strictness: data.preferencesStrictness || null,
  };

  const buildWitnessPayload = witness => ({
    eligibility_confirmed: witness?.eligibilityConfirmed || false,
    name: witness?.name || '',
    address: {
      street: witness?.address?.street || '',
      city: witness?.address?.city || '',
      state: witness?.address?.state || '',
      zip_code: witness?.address?.zipCode || '',
    },
    signature_name: witness?.signatureName || '',
    signature_date: witness?.signatureDate || '',
  });

  const partIV = {
    veteran_attestation: data.veteranAttestation || false,
    veteran_signature_name: data.veteranSignatureName || '',
    veteran_signature_date: data.veteranSignatureDate || '',
    witness_1: buildWitnessPayload(data.witness1),
    witness_2: buildWitnessPayload(data.witness2),
  };

  const payload = {
    form_data: {
      form_number: '10-0137',
      form_version: 'MAR2024_10E1E',
      submission_source: 'va_gov_digital',
      part_i: partI,
      part_ii: partII,
      part_iii: partIII,
      part_iv: partIV,
      metadata: {
        mvi_icn: null,
        prefill_source: 'va_profile',
        submission_timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        form_session_id: uuidv4(),
      },
    },
  };

  return JSON.stringify(payload);
}