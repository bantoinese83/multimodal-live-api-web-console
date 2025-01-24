import React, { useState } from 'react';

type OnboardingFormProps = {
  onSubmit: (role: string, skillLevel: string, name: string) => void;
};

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onSubmit }) => {
  const [role, setRole] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(role, skillLevel, name);
  };

  return (
    <form className="onboarding-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="skillLevel">Skill Level:</label>
        <input
          type="text"
          id="skillLevel"
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default OnboardingForm;
