import { useState, useEffect } from 'react';
import { Shield, MapPin, Star, Check, Share2, Award, User, Briefcase, Clock, FileText } from 'lucide-react';

interface FormData {
  fullName: string;
  primarySkill: string;
  yearsExperience: number;
  city: string;
  country: string;
  description: string;
}

interface ProfileCard {
  fullName: string;
  skillTitle: string;
  yearsExperience: number;
  city: string;
  country: string;
  description: string;
  trustScore: number;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    primarySkill: '',
    yearsExperience: 0,
    city: '',
    country: 'Nigeria',
    description: '',
  });
  const [profileCard, setProfileCard] = useState<ProfileCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const scrollToForm = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'description') {
      setCharCount(value.length);
    }
    if (name === 'yearsExperience') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const generateBio = (profile: ProfileCard): string => {
    const cleanedDescription = profile.description
      .trim()
      .replace(/^[a-z]/, (match) => match.toUpperCase())
      .replace(/\s+/g, ' ')
      .replace(/\.$/, '');

    return `${profile.fullName} is a skilled ${profile.skillTitle} based in ${profile.city}, ${profile.country} with ${profile.yearsExperience} years of hands-on experience. ${cleanedDescription}, bringing expertise and dedication to every project.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trustScore = Math.min(99, 60 + formData.yearsExperience * 2);

    const titleCaseSkill = formData.primarySkill
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const card: ProfileCard = {
      fullName: formData.fullName,
      skillTitle: titleCaseSkill,
      yearsExperience: formData.yearsExperience,
      city: formData.city,
      country: formData.country,
      description: formData.description,
      trustScore,
    };

    setProfileCard(card);

    setTimeout(() => {
      const cardSection = document.getElementById('profile-card');
      if (cardSection) {
        cardSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const countries = [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Ethiopia', 'Tanzania',
    'Uganda', 'Rwanda', 'Cameroon', 'Senegal', 'Morocco', 'Egypt',
    'Cote d\'Ivoire', 'Zimbabwe', 'Botswana', 'Mali', 'Burkina Faso', 'Other'
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-deep-green via-deep-green-light to-deep-green-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.1),transparent_50%)]"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6 bg-deep-green-dark/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/20">
            <Shield className="w-5 h-5 text-gold" />
            <span className="text-gold text-sm font-medium">Professional Skill Verification</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            ArtisanCheck <span className="text-gold">AI</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium mb-4">
            Your skills, verified. Your story, told.
          </p>

          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-8">
            Get a professional skill profile card in 60 seconds — share it with any client, anywhere.
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-deep-green font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gold/25"
          >
            Get Your Card
            <span className="text-xl">→</span>
          </button>
        </div>
      </header>

      {/* Form Section */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-cream">
        <div className="max-w-2xl mx-auto">
          <section id="form-section" className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-deep-green px-6 py-5 sm:px-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-gold" />
                Tell us about your craft
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-deep-green mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Primary Skill */}
              <div>
                <label htmlFor="primarySkill" className="block text-sm font-semibold text-deep-green mb-2">
                  <Star className="w-4 h-4 inline mr-2" />
                  Primary Skill
                </label>
                <input
                  type="text"
                  id="primarySkill"
                  name="primarySkill"
                  required
                  value={formData.primarySkill}
                  onChange={handleInputChange}
                  placeholder="e.g., Carpenter, Web Developer, Tailor"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label htmlFor="yearsExperience" className="block text-sm font-semibold text-deep-green mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="yearsExperience"
                  name="yearsExperience"
                  required
                  min="0"
                  max="50"
                  value={formData.yearsExperience || ''}
                  onChange={handleInputChange}
                  placeholder="Number of years"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-deep-green mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  City / State
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., Lagos, Abuja"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-deep-green mb-2">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-gray-800 bg-white cursor-pointer"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-deep-green mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Brief description of your work
                  <span className="ml-2 text-xs text-gray-400 font-normal">
                    ({charCount}/200 characters)
                  </span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  maxLength={200}
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what you do and your expertise..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-gray-800 placeholder-gray-400 resize-none"
                />
                {charCount >= 180 && (
                  <p className="text-xs text-amber-600 mt-1">
                    {200 - charCount} characters remaining
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-deep-green hover:bg-deep-green-light text-white font-semibold py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                Generate My Profile Card
              </button>
            </form>
          </section>

          {/* Profile Card Output */}
          {profileCard && (
            <section id="profile-card" className="mt-10 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-w-md mx-auto">
                {/* Card Header */}
                <div className="bg-deep-green px-6 py-5 relative">
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <Star className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <h3 className="text-gold text-sm font-medium mb-1 uppercase tracking-wider">Skill Profile</h3>
                  <p className="text-white font-bold text-2xl sm:text-3xl leading-tight break-words" style={{ wordBreak: 'break-word' }}>
                    {profileCard.fullName}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Skill Title */}
                  <div className="mb-4">
                    <p className="text-gold font-bold text-xl">{profileCard.skillTitle}</p>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {profileCard.city}, {profileCard.country}
                    </p>
                  </div>

                  {/* Trust Score */}
                  <div className="mb-5 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-deep-green font-semibold text-sm">Trust Score</span>
                      <span className="text-gold font-bold text-lg">{profileCard.trustScore}/100</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-dark to-gold-light rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${profileCard.trustScore}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      Based on {profileCard.yearsExperience} years of professional experience
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="mb-5">
                    <h4 className="text-deep-green font-semibold text-sm mb-2">Professional Bio</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {generateBio(profileCard)}
                    </p>
                  </div>

                  {/* Verified Badge */}
                  <div className="flex items-center gap-2 mb-5 p-3 bg-deep-green/5 rounded-lg border border-deep-green/10">
                    <div className="w-8 h-8 rounded-full bg-deep-green flex items-center justify-center">
                      <Check className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-deep-green font-medium text-sm">Verified by ArtisanCheck AI</span>
                  </div>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="w-full bg-gold hover:bg-gold-light text-deep-green font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    {copied ? 'Link copied!' : 'Share This Card'}
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-deep-green py-6 px-4 text-center">
        <p className="text-white/70 text-sm">
          © ArtisanCheck AI — Built for African artisans & freelancers
        </p>
      </footer>
    </div>
  );
}

export default App;
